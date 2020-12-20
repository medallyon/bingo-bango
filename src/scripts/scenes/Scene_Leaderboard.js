import * as Phaser from "phaser";

import Scene from "../objects/Scene.js";
import Back from "../objects/Back.js";
import Leaderboard from "../objects/Leaderboard.js";


class Scene_Leaderboard extends Scene
{
	constructor()
	{
		super({
			key: "Scene_Leaderboard",
			wallpaper: true
		});
		this.score = {
			tracker: null,
			leaderboard: true
		};

		this.buttons = {
			back: null
		};
	}

	_createLeaderboard()
	{
		this.leaderboard = new Leaderboard({
			scene: this,
			x: this.width * 2,
			y: this.height * .50,
		});
		this.leaderboard.setScale(1);
		this.add.existing(this.leaderboard);
	}
	create(data = {})
	{
		super.create(data);

		/* Settings Panel Background */
		//this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.50, "panel_leaderboard")
		//	.setScale(1);
		this._createLeaderboard();
		/* Back Button */

		this.buttons.back = new Back("Scene_Menu_Main", {
			scene: this,
			x: this.width * .1,
			y: this.height * .075
		}).setScale(.5);
		this.add.existing(this.buttons.back);
	}

	update()
	{

	}
}

export default Scene_Leaderboard;
