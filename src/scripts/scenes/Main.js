import * as Phaser from "phaser";

import CardHolder from "../objects/CardHolder.js";
import ScoreTracker from "../objects/ScoreTracker.js";
import ScoreBoard from "../objects/ScoreBoard.js";

class MainScene extends Phaser.Scene
{
	constructor()
	{
		super({ key: "MainScene" });

		this.cards = null;
		this.score = {
			tracker: null,
			board: null
		};
	}

	create(data = {})
	{
		this.score.tracker = new ScoreTracker({
			scene: this,
			x: this.cameras.main.width * .88,
			y: this.cameras.main.height * .1
		});
		this.score.tracker.setScale(.65);
		this.add.existing(this.score.tracker);

		this.score.board = new ScoreBoard({
			scene: this,
			x: this.cameras.main.width * .825,
			y: this.cameras.main.height * .65
		});
		this.score.board.setScale(.5);
		this.add.existing(this.score.board);

		const spawnCards = data.cards || 4;
		this.cards = new CardHolder(spawnCards, this, this.cameras.main.width * .5, this.cameras.main.height * (spawnCards < 3 ? .25 : .12));
		this.add.existing(this.cards);
	}

	update()
	{

	}
}

export default MainScene;
