import * as Phaser from "phaser";

import { BINGO } from "../globals.js";

import Button from "./buttons/Button.js";
import TextOverlay from "./buttons/overlays/TextOverlay.js";

class Ball extends Button
{
	static preload(load)
	{
		load.setPath("assets/img/balls/");
		for (let i = 0; i < 5; i++)
			load.image(`ball_${BINGO[i]}`, `ball_${BINGO[i]}.png`);
	}

	constructor(scene, letter, number, data = {})
	{
		const sampleBall = new Phaser.GameObjects.Image(scene, 0, 0, "ball_B");
		super(Object.assign({
			scene,
			texture: `ball_${letter}`,
			overlay: new TextOverlay(scene, number.toString(), {
				y: sampleBall.displayHeight * .12
			})
		}, data));

		this.number = number;
	}
}

export default Ball;
