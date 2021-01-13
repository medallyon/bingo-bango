require("dotenv").config();

const webpack = require("webpack")
	, colyseus = require("colyseus")
	, schema = require("@colyseus/schema")
	, join = require("path").join
	, http = require("http")
	, cookieParser = require("cookie-parser")
	, express = require("express")
	, app = express();

const BingoNumberGenerator = require(join(__dirname, "src", "scripts", "classes", "BingoNumberGenerator.js"));

/*
 * [ WEBPACK ]
 */

let compiling = true
	, webpackError;

const compiler = webpack(require(join(__dirname, "webpack", "webpack.prod.js")));
function build()
{
	return new Promise(function(resolve, reject)
	{
		compiler.run(function(err, stats)
		{
			if (err)
				return reject(webpackError = err);

			compiling = false;
			resolve(stats);
		});
	});
}

/*
 * [ APP SETTINGS ]
 */

app.set("trust proxy", true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// configure CORS (https://enable-cors.org/server_expressjs.html)
app.use(function(req, res, next)
{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

/*
 * [ ROUTES ]
 */

// serve app in 'dist' from the get-go
app.use(express.static(join(__dirname, "dist")));

app.get("/", function(req, res)
{
	if (compiling)
		return res.status(202).send("Please wait while the game is being compiled...");

	if (webpackError)
		return res.status(500).send(webpackError);

	res.sendFile(join(__dirname, "dist", "index.html"));
});

if (process.env.NODE_ENV !== "production")
{
	try
	{
		const colyseusMonit = require("@colyseus/monitor").monitor;
		app.use("/monitor", colyseusMonit());
	}

	catch (err)
	{
		console.warn(err);
	}
}

/*
 * [ IO Setup ]
 */

const io = new colyseus.Server({
	server: http.createServer(app)
});

class Player extends schema.Schema
{
	constructor(id, username)
	{
		super();

		this.sessionId = null;

		this.id = id;
		this.username = username || "Player";
		this.score = 0;
	}
}

class MatchState extends schema.Schema
{
	constructor()
	{
		super();

		this.generator = new BingoNumberGenerator();
		this.players = new schema.MapSchema();
	}
}

schema.defineTypes(Player, {
	id: "string",
	username: "string",
	score: "number"
});
schema.defineTypes(MatchState, {
	generator: BingoNumberGenerator,
	players: {
		map: Player
	}
});

class MatchRoom extends colyseus.Room
{
	// When room is initialized
	onCreate(options)
	{
		console.log("MatchRoom created");

		this.setState(new MatchState());

		this.onMessage("match-score-scored", (client, data) =>
		{
			const player = this.state.players.get(client.sessionId);
			player.score += data.score;

			// call here to REST api to increase this player's global XP

			console.log(`Player { ${player.username} } received ${data.score} XP.`);

			this.broadcast("match-score-update", {
				id: player.sessionId,
				score: player.score
			});
		});

		this.clock.start();

		this.ballsCounted = 0;
		this.matchInterval = this.clock.setInterval(() =>
		{
			this.broadcast("match-ball", {
				ball: this.state.generator.random()
			});

			if (++this.ballsCounted === 45)
			{
				this.matchInterval.clear();
				this.broadcast("match-end", {
					players: this.state.players
				});
			}
		}, 7500);
	}

	// Authorize client based on provided options before WebSocket handshake is complete
	onAuth(client, options, request)
	{
		return true;
	}

	// When client successfully joins the room
	onJoin(client, options, auth)
	{
		console.log(`[Client ${client.id}] joined room MatchRoom`);

		const player = new Player();
		player.sessionId = client.sessionId;

		this.state.players.set(player.sessionId, player);
	}

	// When a client leaves the room
	async onLeave(client, issuedByClient)
	{
		console.log(`[Client ${client.id}] left room MatchRoom`);

		// flag client as inactive for other users
		this.state.players.get(client.sessionId).connected = false;

		try
		{
			if (issuedByClient)
				throw new Error("consented leave");

			// allow disconnected client to reconnect into this room until 20 seconds
			await this.allowReconnection(client, 20);

			// client returned! let's re-activate it.
			this.state.players.get(client.sessionId).connected = true;
		}

		catch (e)
		{
			// 20 seconds expired. let's remove the client.
			delete this.state.players[client.sessionId];
		}
	}

	// Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
	// onDispose() { }
}

io.define("lobby", colyseus.LobbyRoom);
io.define("test", MatchRoom)
	.sortBy({ clients: -1 });

/*
 * [ SERVER LISTEN ]
 */

console.log(`\nStarting a Server on :${process.env.PORT}`);
io.listen(process.env.PORT);

console.log("Building WebPack using Production Configuration");
build()
	.then(function(stats)
	{
		console.log(stats.toString({
			chunks: false,
			colors: true
		}));
		console.log(`\nGame packed and running at http://localhost:${process.env.PORT}`);
	})
	.catch(function(err)
	{
		console.error("\nEncountered an error while building WebPack:");
		console.error(err.stack || err);

		if (err.details)
			console.error(err.details);

		process.exit(1);
	});

module.exports = io;