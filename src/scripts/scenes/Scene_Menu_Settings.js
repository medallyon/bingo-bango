import * as Phaser from "phaser";

import Slider from "../objects/settings/variations/Slider.js";

class Scene_Menu_Settings extends Phaser.Scene
{
	get width()
	{
		return this.cameras.main.width;
	}
	get height()
	{
		return this.cameras.main.height;
	}

	constructor()
	{
		super({ key: "Scene_Menu_Settings" });
	}

	create()
	{
		/* Wallpaper */
		this.wallpaper = new Phaser.GameObjects.Image(this, this.cameras.main.width / 2, this.cameras.main.height / 2, `bg_wallpaper_0${Math.floor(Math.random() * 4)}`).setDepth(0);
		this.wallpaper.setScale(0.7111);
		this.add.existing(this.wallpaper);

		/* Setting Panel Background */
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.50, "bg_panel_settings")
			.setScale(0.7);

		/* Volume Sliders */

		// TODO: Add "Settings" title

		const DEFAULTS_SLIDER = {
			scene: this,
			element: {
				width: this.width * .4, // length
				height: 20, // thiccness
			}
		};

		// volume-master slider
		this.add.existing(new Slider(Object.assign(DEFAULTS_SLIDER, {
			x: this.width * .5,
			y: this.height * .5,
			key: "volumes.master",
			title: "Master",
		})));

		// volume-music slider
		this.add.existing(new Slider(Object.assign(DEFAULTS_SLIDER, {
			x: this.width * .5,
			y: this.height * .6,
			key: "volumes.music",
			title: "Music",
		})));

		// volume-voice slider
		this.add.existing(new Slider(Object.assign(DEFAULTS_SLIDER, {
			x: this.width * .5,
			y: this.height * .7,
			key: "volumes.voice",
			title: "Announcers",
		})));

		// volume-effects slider
		this.add.existing(new Slider(Object.assign(DEFAULTS_SLIDER, {
			x: this.width * .5,
			y: this.height * .8,
			key: "volumes.effects",
			title: "Effects",
		})));
	}
}

export default Scene_Menu_Settings;
