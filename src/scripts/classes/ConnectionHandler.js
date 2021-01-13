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
		this.match = null;
	}

	joinOrCreateMatch()
	{
		return new Promise((resolve, reject) =>
		{
			this.client.joinOrCreate("match")
				.then(match =>
				{
					resolve(match);

					console.log(match);
					this.match = match;

					match.onMessage("match-load", msg =>
					{
						// load 'Scene_Match' here
						this.game.scene.sleep();
						this.game.scene.run("Scene_Match");
					});

					match.onMessage("match-score-update", msg =>
					{
						// this.game.matchScene.updateScores(msg.scores);
					});

					match.onMessage("match-ball", msg =>
					{
						this.game.matchScene.playBall(msg.ball);
					});

					match.onMessage("match-end", () =>
					{
						// go back to the main menu / lobbies screen
						// this.game.matchScene.end();
					});

					match.onLeave(code =>
					{
						window.alert("This match was abruptly ended due to a server failure. Sorry.");

						this.leaveMatch();
					});
				}).catch(reject);
		});
	}

	leaveMatch()
	{
		console.log(this.match);
		if (!this.match)
			return;

		console.log("Destroying match");

		this.match.removeAllListeners();
		this.match.leave();
		this.match = null;

		this.game.matchScene.scene.sleep();
		this.game.matchScene.scene.run("Scene_Menu_Main");
		this.game.matchScene = null;
	}
}

export default ConnectionHandler;
