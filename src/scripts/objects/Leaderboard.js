import * as Phaser from "phaser";
import TextOverlay from "./buttons/overlays/TextOverlay.js";

class Leaderboard extends Phaser.GameObjects.Container
{
	constructor(data)
	{
		super(data.scene, data.x, data.y);

		this.scores = {};
		this.name ={};
		this.bg = new Phaser.GameObjects.Image(this.scene, 0, 0, "panel_leaderboard");
		this.add(this.bg);

		this.overlay = new TextOverlay(this.scene, this.score.toString());
		this.overlay.y -= 8;
		this.overlay.text.setOrigin(.05, .35);
		this.add(this.overlay);
	}
}

export default Leaderboard;
