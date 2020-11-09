require("dotenv").config();

const webpack = require("webpack")
	, colyseus = require("colyseus")
	, join = require("path").join
	, http = require("http")
	, express = require("express")
	, app = express();

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
// app.use(bodyParser.json());
// app.use(cookieParser());

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

class TestRoom extends colyseus.Room
{
	// When room is initialized
	onCreate(options)
	{
		console.log("Room TestRoom created");
	}

	// Authorize client based on provided options before WebSocket handshake is complete
	onAuth(client, options, request)
	{
		return true;
	}

	// When client successfully join the room
	onJoin(client, options, auth)
	{
		console.log(`[Client ${client.id}] joined room TestRoom`);
	}

	// When a client leaves the room
	onLeave(client, consented)
	{
		console.log(`[Client ${client.id}] left room TestRoom`);
	}

	// Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
	onDispose()
	{ }
}

io.define("test", TestRoom);

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
		console.error("Encountered an error while building WebPack:");
		console.error(err.stack || err);

		if (err.details)
			console.error(err.details);

		process.exit(1);
	});

module.exports = io;
