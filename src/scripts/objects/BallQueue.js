import * as Phaser from "phaser";

class BallQueue extends Phaser.GameObjects.Container
{
	constructor(data)
	{
		super(data.scene, data.x, data.y);

		this.scores = {};

		this.bg = new Phaser.GameObjects.Image(this.scene, 0, 0, "bg_scoreboard");
		this.add(this.bg);
	}
}

export default BallQueue;
