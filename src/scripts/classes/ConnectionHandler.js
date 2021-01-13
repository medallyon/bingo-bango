import * as Colyseus from "colyseus.js";

class ConnectionHandler
{
	constructor(game)
	{
		this.game = game;

		this.host = window.location.origin
			.replace("http", "ws");

		this.client = new Colyseus.Client(this.host);
		this.lobby = null;
		this.rooms = [];

		this.client.joinOrCreate("lobby")
			.then(lobby =>
			{
				console.log(lobby.sessionId, "joined", lobby.name);

				this.lobby = lobby;
				/*this.lobby.onMessage("score_change", scores =>
				{
					// scores[client_id] = { player: <Player>, score: <Number> }
				});*/

				this.lobby.onMessage("rooms", rooms =>
				{
					this.rooms = rooms;
				});

				this.lobby.onMessage("+", ([ id, room ]) =>
				{
					const index = this.rooms.findIndex(x => x.id === id);
					if (index === -1)
						this.rooms.splice(index, 1, room);
					else
						this.rooms.push(room);
				});

				this.lobby.onMessage("-", (id) =>
				{
					this.rooms.splice(this.rooms.findIndex(x => x.id === id), 1);
				});
			}).catch(console.error);
	}

	joinOrCreateMatch()
	{
		return new Promise((resolve, reject) =>
		{
			this.client.joinOrCreate("match")
				.then(match =>
				{
					console.log(match);

					match.onMessage("match-score-update", msg =>
					{
						// this.game.match.updateScores(msg.scores);
					});

					match.onMessage("match-ball", msg =>
					{
						this.game.match.playBall(msg.ball);
					});

					match.onMessage("match-end", () =>
					{
						// go back to the main menu / lobbies screen
						// this.game.match.end();
					});

					match.onLeave(code =>
					{
						window.alert("This match was abruptly ended due to a server failure. Sorry.");

						// go back to the main menu / lobbies screen
						// this.game.match.end("abrupt");
					});
				}).catch(console.error);
		});
	}
}

export default ConnectionHandler;
