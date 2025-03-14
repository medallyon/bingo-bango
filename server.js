require("dotenv").config();

process.env.NODE_ENV = process.env.NODE_ENV || process.env.VERCEL_ENV;

const join = require("path").join,
	BingoNumberGenerator = require(join(
		__dirname,
		"server",
		"ServerBingoNumberGenerator.js"
	));

/*
 * [ WEBPACK ]
 */

const webpack = require("webpack");

let compiling = true,
	webpackError;

const compiler = webpack(
	require(join(
		__dirname,
		"webpack",
		`webpack.${process.env.NODE_ENV === "production" ? "prod" : "dev"}.js`
	))
);
function build() {
	return new Promise(function (resolve, reject) {
		compiler.run(function (err, stats) {
			if (err) return reject((webpackError = err));

			compiling = false;
			resolve(stats);
		});
	});
}

/*
 * [ APP SETTINGS ]
 */

const express = require("express"),
	cookieParser = require("cookie-parser"),
	app = express();

app.set("trust proxy", true);
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// configure CORS (https://enable-cors.org/server_expressjs.html)
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

/*
 * [ SESSION ]
 */

const session = require("express-session"),
	FileStore = require("session-file-store")(session);

app.use(
	session({
		resave: true,
		saveUninitialized: false,
		secret: process.env.DOMAIN_ROOT,
		store: new FileStore({
			path: join(__dirname, "sessions"),
			secret: process.env.PASSPORT_SECRET_DISCORD,
		}),
	})
);

/*
 * [ OAuth2 ]
 */

/* const passport = require("passport"),
	DiscordStrategy = require("passport-discord").Strategy;

passport.serializeUser(function (user, done) {
	done(null, user);
});
passport.deserializeUser(function (obj, done) {
	done(null, obj);
});

passport.use(
	new DiscordStrategy(
		{
			clientID: process.env.PASSPORT_DISCORD_ID,
			clientSecret: process.env.PASSPORT_DISCORD_SECRET,
			callbackURL: `https://${process.env.DOMAIN_ROOT}/auth`,
			scope: ["identify"],
		},
		function (_, _, profile, cb) {
			cb(null, profile);
		}
	)
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/login_actual", passport.authenticate("discord"));
app.get(
	"/auth",
	passport.authenticate("discord", {
		successRedirect: "/",
		failureRedirect: "/",
	}),
	function (_, res) {
		res.redirect("/");
	}
); */

/*
 * [ ROUTES ]
 */

if (process.env.NODE_ENV !== "production") {
	try {
		const colyseusMonit = require("@colyseus/monitor").monitor;
		app.use("/monitor", colyseusMonit());
	} catch (err) {
		console.warn(err);
	}
}

/* const MIDDLE_MOVE_TO_GAME_IF_AUTHENTICATED = (req, res, next) => {
	if (req.isAuthenticated() && req.user) return res.redirect("/game");
	next();
}; */

/* if (process.env.NODE_ENV === "production") {
	app.get("/", MIDDLE_MOVE_TO_GAME_IF_AUTHENTICATED, function (_, res) {
		res.sendFile(join(__dirname, "dist", "login.html"));
	});
	app.use("/", express.static(join(__dirname, "dist")));

	app.get("/login", MIDDLE_MOVE_TO_GAME_IF_AUTHENTICATED, function (_, res) {
		res.redirect("/login_actual");
	});

	app.use(
		"/",
		function (_, res, next) {
			if (compiling)
				return res
					.status(202)
					.send("Please wait while the game is being compiled...");

			if (webpackError) return res.status(500).send(webpackError);

			next();
		},
		function (req, res, next) {
			// save discord user info in cookies
			res.cookie("user", JSON.stringify(req.user));

			next();
		},
		express.static(join(__dirname, "dist"))
	);
} else {
	app.use(
		"/",
		function (_, res, next) {
			if (compiling)
				return res
					.status(202)
					.send("Please wait while the game is being compiled...");

			if (webpackError) return res.status(500).send(webpackError);

			next();
		},
		express.static(join(__dirname, "dist"))
	);
} */

app.use(
	"/",
	function (_, res, next) {
		if (compiling)
			return res
				.status(202)
				.send("Please wait while the game is being compiled...");

		if (webpackError) return res.status(500).send(webpackError);

		next();
	},
	express.static(join(__dirname, "dist"))
);

/*
 * [ IO Setup ]
 */

const hash = new (require("hashids/cjs"))(process.env.DOMAIN_ROOT, 6),
	{ Server, Room, LobbyRoom } = require("colyseus"),
	{ defineTypes, Schema, MapSchema } = require("@colyseus/schema"),
	{ createServer } = require("http"),
	request = require("request");

const io = new Server({
	server: createServer(app),
});

class Player extends Schema {
	constructor(client) {
		super();

		this.client = client;

		this.provider = "bingo-bango";
		this.id = hash.encode(Math.floor(Math.random() * 1000000));
		this.xp = 0;
		this.score = 0;

		this.sessionId = null;
	}

	setScore(value) {
		this.xp += value - this._score;
		this.score = value;
	}

	toJson() {
		return this.toJSON();
	} // eslint-disable-line
	toJSON() {
		return {
			provider: this.provider,
			id: this.id,
			xp: this.xp,
			score: this.score,
			username: this.username,
			discriminator: this.discriminator,
			tag: this.tag,
			avatar: this.avatar,
		};
	}
}
defineTypes(Player, {
	provider: "string",
	id: "string",
	xp: "number",
	score: "number",
});

class GuestPlayer extends Player {
	constructor(client, user = {}) {
		super(client);

		this.client = client;

		this.username = user.username || "Guest";
		this.discriminator =
			user.discriminator ||
			new Array(4)
				.fill(0)
				.reduce(
					(acc) => (acc += Math.floor(Math.random() * 10).toString()),
					""
				);
		this.tag = `${this.username}#${this.discriminator}`;
	}
}
defineTypes(GuestPlayer, {
	username: "string",
	discriminator: "string",
	tag: "string",
});

class DiscordPlayer extends GuestPlayer {
	constructor(client, user) {
		super(client, user);

		this.provider = "discord";
		this.id = user.id;
		this.avatar = user.avatar;

		this.fetchXP()
			.then((xp) => {
				this.xp = xp;
				this.client.send("client-xp", { xp });
			})
			.catch(() => {});
	}

	fetchXP() {
		return new Promise((resolve, reject) => {
			request(
				{
					uri: "https://api.medallyon.me/uni/2020/wgd/scores",
					json: true,
					headers: {
						Authorization: process.env.DATABASE_SCORES_SECRET,
					},
				},
				(err, _, body) => {
					if (err) return reject(err);

					if (body[this.id]) resolve(body[this.id]);
					else
						reject(new Error(`Global Scores doesn't contain ${this.id} (yet)`));
				}
			);
		});
	}

	updateXP() {
		return new Promise((resolve, reject) => {
			request(
				{
					uri: "https://api.medallyon.me/uni/2020/wgd/scores",
					json: true,
					method: "POST",
					headers: {
						Authorization: process.env.DATABASE_SCORES_SECRET,
					},
					data: {
						id: this.id,
						user: {
							tag: this.tag,
							xp: this.xp,
						},
					},
				},
				(err, res) => {
					if (err) return reject(err);

					if (res.statusCode.toString().startsWith("2")) resolve();
					else reject(new Error(`Response returned code ${res.statusCode}`));
				}
			);
		});
	}
}
defineTypes(DiscordPlayer, {
	avatar: "string",
});

class MatchState extends Schema {
	constructor() {
		super();

		this.generator = new BingoNumberGenerator();

		this.cards = 2;
		this.interval = 7.5;
		this.players = new MapSchema();
	}
}
defineTypes(MatchState, {
	host: "string",
	cards: "number",
	interval: "number",
	players: {
		map: Player,
	},
});

class MatchRoom extends Room {
	_fetchScores() {
		return new Promise((resolve, reject) => {
			request(
				{
					uri: "https://api.medallyon.me/uni/2020/wgd/scores",
					json: true,
					headers: {
						Authorization: process.env.DATABASE_SCORES_SECRET,
					},
				},
				(err, res, body) => {
					if (err) return reject(err);

					resolve(body);
				}
			);
		});
	}

	// When room is initialized
	onCreate(options) {
		console.log("MatchRoom created");

		this.generator = new BingoNumberGenerator();
		this.started = false;
		this.ready = [];

		this.setState(new MatchState());

		this.onMessage("match-host-begin", (client) => {
			console.log(`[${client.sessionId}] match-host-begin`);

			if (client.sessionId !== this.state.host) return;

			this.started = true;
			this.lock();
			this.broadcast("match-load");
		});

		this.onMessage("match-settings-cards", (client, msg) => {
			if (this.state.host === client.sessionId) this.state.cards = msg.cards;
		});
		this.onMessage("match-settings-interval", (client, msg) => {
			if (this.state.host === client.sessionId)
				this.state.interval = msg.interval;
		});

		this.onMessage("match-ready", (client) => {
			console.log(`[${client.sessionId}] match-ready`);

			if (!this.ready.includes(client.sessionId))
				this.ready.push(client.sessionId);

			if (this.ready.length !== this.clients.length) return;

			this.broadcast("match-start");

			this.clock.start();
			this.ballsCounted = 0;
			this.matchInterval = this.clock.setInterval(() => {
				this.broadcast("match-ball", {
					ball: this.generator.random(),
				});

				if (++this.ballsCounted === 45) {
					this.clock.clear();
					this.broadcast("match-end", {
						players: this.state.players,
					});

					// database call to REST api to increase every 'this.clients' global XP += client.score
					for (const player of this.state.players.values()) {
						if (!(player instanceof DiscordPlayer)) continue;

						player.updateXP().catch(console.error);
					}
				}
			}, 1000 * this.state.interval);

			this.onMessage("leaderboard-fetch-100", (client) => {
				this._fetchScores()
					.then((scores) => {
						console.log(scores);

						let sorted = [];
						for (const score of Object.values(scores)) sorted.push(score);

						sorted = sorted
							.sort((a, b) => {
								a.xp - b.xp;
							})
							.slice(0, 100);

						console.log(sorted);

						client.send("leaderboard-100", { scores: sorted });
					})
					.catch(console.error);
			});
		});

		this.onMessage("match-score-scored", (client, data) => {
			console.log(`[${client.sessionId}] match-score-scored, ${data}`);

			const player = this.state.players.get(client.sessionId);
			player.setScore(player.score + data.score);

			console.log(`{ ${player.tag} } received ${data.score} match points.`);

			this.broadcast("match-score-update", {
				id: player.id,
				score: player.score,
			});
		});
	}

	// Authorize client based on provided options before WebSocket handshake is complete
	/*onAuth(client, options, request)
	{
		return true;
	}*/

	// When client successfully joins the room
	onJoin(client, options /*, auth*/) {
		console.log(`[Client ${client.id}] joined room MatchRoom`);

		console.log(options.userData.provider === "discord");
		console.log(options);

		let player;
		if (options.userData.provider === "discord")
			player = new DiscordPlayer(client, options.userData);
		else player = new GuestPlayer(client, options.userData);

		console.log(player);

		this.broadcast("match-player-join", {
			userData: player.toJSON(),
		});

		player.sessionId = client.sessionId;
		this.state.players.set(player.sessionId, player);

		const players = [];
		for (const client of this.clients)
			players.push(this.state.players.get(client.sessionId).toJSON());
		client.send("match-clients", { players });

		if (this.clients.length === 1) this.state.host = client.sessionId;
	}

	// When a client leaves the room
	async onLeave(client, issuedByClient) {
		console.log(`[Client ${client.id}] left room MatchRoom`);

		// flag client as inactive for other users
		this.state.players.get(client.sessionId).connected = false;

		try {
			if (issuedByClient) throw new Error("consented leave");

			// allow disconnected client to reconnect into this room until 20 seconds
			await this.allowReconnection(client, 10);

			// client returned! let"s re-activate it.
			this.state.players.get(client.sessionId).connected = true;
		} catch (e) {
			this.broadcast("match-player-leave", {
				userData: this.state.players[client.sessionId].toJSON(),
			});

			// 20 seconds expired. let's remove the client.
			delete this.state.players[client.sessionId];
		}

		if (this.clients.length && client.sessionId === this.state.host.sessionId)
			this.state.host = this.clients[0].sessionId;
	}

	// Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
	onDispose() {
		console.log(`Disposing of MatchRoom { ${this.roomId} }`);
	}
}

io.define("lobby", LobbyRoom);
io.define("match", MatchRoom).sortBy({ clients: -1 });

/*
 * [ SERVER LISTEN ]
 */

console.log(`Starting a Server on :${process.env.PORT}`);
io.listen(process.env.PORT);

console.log("Building WebPack using Production Configuration");
build()
	.then(function (stats) {
		if (process.env.NODE_ENV !== "production")
			console.log(
				stats.toString({
					chunks: false,
					colors: true,
				})
			);
		console.log(`\nGame packed and running on port ${process.env.PORT}`);

		try {
			require("open")(`http://localhost:${process.env.PORT}`);
		} catch (e) {} // eslint-disable-line
	})
	.catch(function (err) {
		console.error("\nEncountered an error while building WebPack:");
		console.error(err.stack || err);

		if (err.details) console.error(err.details);
	});

module.exports = io;
