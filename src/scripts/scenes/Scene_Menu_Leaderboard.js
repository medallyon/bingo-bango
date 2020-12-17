import * as Phaser from "phaser";

import Scene from "../objects/Scene.js";
import Back from "../objects/Back.js";

class Scene_Menu_Leaderboard extends Scene
{
	constructor()
	{
		super({
			key: "Scene_Menu_Leaderboard",
			wallpaper: true
		});

		this.buttons = {
			back: null
		};
	}

	create(data = {})
	{
		super.create(data);

		/* Settings Panel Background */
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.50, "panel_leaderboard")
			.setScale(1);

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

export default Scene_Menu_Leaderboard;
