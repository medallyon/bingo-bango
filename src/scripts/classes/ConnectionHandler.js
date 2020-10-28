import * as Colyseus from "colyseus.js";

class ConnectionHandler
{
	constructor(game)
	{
		this.game = game;

		this.host = window.location.origin.replace(/^https?/, "ws");
		this.client = new Colyseus.Client(this.host);

		this.client.joinOrCreate("test")
			.then(room =>
			{
				console.log(room.sessionId, "joined", room.name);
			}).catch(console.error);
	}
}

export default ConnectionHandler;
