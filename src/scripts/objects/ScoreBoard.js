import * as Phaser from "phaser";

class ScoreBoard extends Phaser.GameObjects.Container
{
	constructor(data)
	{
		super(data.scene, data.x, data.y);

		this.scores = {};

		this.bg = new Phaser.GameObjects.Image(this.scene, 0, 0, "panel_scoreboard");
		this.add(this.bg);
	}
}

export default ScoreBoard;
