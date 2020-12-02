import * as Colyseus from "colyseus.js";

class ConnectionHandler
{
	constructor(game)
	{
		this.game = game;

		this.host = window.location.origin
			.replace("http", "ws")
			.replace("https", "wss");
		this.client = new Colyseus.Client(this.host);
		this.room = null;

		this.scores = {};

		this.client.joinOrCreate("test")
			.then(room =>
			{
				console.log(room.sessionId, "joined", room.name);

				room.onMessage("score_change", scores =>
				{
					// scores[client_id] = { player: <Player>, score: <Number> }
				});
			}).catch(console.error);
	}
}

export default ConnectionHandler;
