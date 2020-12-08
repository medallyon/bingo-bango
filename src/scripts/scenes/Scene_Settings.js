import * as Phaser from "phaser";

import { BINGO } from "../globals.js";
import Button from "../objects/buttons/Button.js";
import Voicepack from "../classes/Voicepack.js";

class Scene_Settings extends Phaser.Scene
{
	constructor()
	{
		super({ key: "Scene_Settings" });

		this.buttons = {
			play: null,
			leaderboard: null,
			settings: null
		};
	}

	get _defaultButtonHandlers()
	{
		return {
			pointerdown: function()
			{
				this.bg.setTint(0X000000);
			},
			pointerout: function()
			{
				this.bg.clearTint(0X000000);
			},
			pointerup: function()
			{
				this.bg.clearTint(0X000000);
			}
		};
	}

	create(data = {})
	{
		/* Wallpaper */
		this.wallpaper = new Phaser.GameObjects.Image(this, this.cameras.main.width/2, this.cameras.main.height/2, `bg_wallpaper_0${Math.floor(Math.random() * 4)}`).setDepth(0);
		this.wallpaper.setScale(0.7111);
		this.add.existing(this.wallpaper);




	}

	update()
	{

	}
}

export default Scene_Settings;
