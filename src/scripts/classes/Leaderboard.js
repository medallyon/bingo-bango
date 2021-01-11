import * as Colyseus from "colyseus.js";
import * as Phaser from "phaser";


class Leaderboard extends Phaser.GameObjects.Container
{
	constructor()
	{
		super();
		this.game = game;
		this.bg();
		this.host = window.location.origin
			.replace("http", "ws")
			.replace("https", "wss");
		this.client = new Colyseus.Client(this.host);
		this.room = null;

		this.scores = {};

	}
}

export default Leaderboard;
