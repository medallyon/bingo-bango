import * as Phaser from "phaser";

class BallQueue extends Phaser.GameObjects.Container
{
	constructor(data)
	{
		super(data.scene, data.x, data.y);

		this.balls = [];

		this.bg = new Phaser.GameObjects.Image(this.scene, 0, 0, "bg_ballQueue")
			.setRotation(Math.PI / 2);
		this.add(this.bg);
	}

	addBall()
	{

	}
}

export default BallQueue;
