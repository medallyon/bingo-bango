import * as Phaser from "phaser";

import TextOverlay from "./buttons/overlays/TextOverlay.js";

class ScoreTracker extends Phaser.GameObjects.Container
{
	get score()
	{
		return this._score;
	}
	set score(value)
	{
		this._score = Math.max(0, value);
		this.overlay.text.setText(this._score);
	}

	constructor(data)
	{
		super(data.scene, data.x, data.y);

		this._score = 0;

		this.bg = new Phaser.GameObjects.Image(this.scene, 0, 0, "bg_score");
		this.add(this.bg);

		this.overlay = new TextOverlay(this.scene, this.score.toString());
		this.overlay.y -= 8;
		this.overlay.text.setOrigin(.05, .35);
		this.add(this.overlay);
	}

	valueof()
	{
		return this.score;
	}

	toString()
	{
		return this.score.toString();
	}
}

export default ScoreTracker;
