import * as Phaser from "phaser";

import Ball from "../objects/Ball.js";

class BallQueue extends Phaser.GameObjects.Container
{
	static preload(load)
	{
		load.setPath("assets/img/balls/");
		load.image("bg_ballQueue", "bg_ballQueue.png");
	}

	constructor(data)
	{
		super(data.scene, data.x, data.y);

		this.balls = [];

		this.bg = new Phaser.GameObjects.Image(this.scene, 0, 0, "bg_ballQueue");
		this.add(this.bg);
	}

	createBall(letter, number)
	{
		return new Ball(this.scene, letter, number, {
			y: -this.bg.displayHeight * .6
		});
	}

	push(ball)
	{
		let oldBall;
		if (this.balls.length === 5)
			oldBall = this.balls.shift();
		this.remove(oldBall, true);

		this.balls.push(ball);
		this.add(ball);

		this.scene.tweens.add({
			targets: this.balls,
			ease: "Bounce.easeOut",
			y: "+=" + this.bg.displayHeight * .2,
			duration: 3000
		});
	}
}

export default BallQueue;
