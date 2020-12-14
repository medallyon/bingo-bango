import * as Phaser from "phaser";

import Scene from "../objects/Scene.js";
import Back from "../objects/Back.js";
import Slider from "../objects/settings/variations/Slider.js";
import Dropdown from "../objects/settings/variations/Dropdown.js";

class Scene_Menu_Settings extends Scene
{
	constructor()
	{
		super({
			key: "Scene_Menu_Settings",
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
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.50, "panel_settings")
			.setScale(0.7);

		/* Back Button */

		this.buttons.back = new Back("Scene_Menu_Main", {
			scene: this,
			x: this.width * .1,
			y: this.height * .075
		}).setScale(.5);
		this.add.existing(this.buttons.back);

		/* Dropdown Menus */

		this.add.existing(new Dropdown({
			scene: this,
			x: this.width * .6,
			y: this.height * .35,
			key: "voicepack",
			title: "Announcer Pack",
			choices: [{
				name: "Deyan"
			}]
		}));

		/* Volume Sliders */

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
			onChanged: (val) =>
			{
				this.game.audio.master.setVolume(val);
			}
		})));

		// volume-music slider
		this.add.existing(new Slider(Object.assign(DEFAULTS_SLIDER, {
			x: this.width * .5,
			y: this.height * .6,
			key: "volumes.music",
			title: "Music",
			onChanged: (val) =>
			{
				this.game.audio.music.setVolume(val);
			}
		})));

		// volume-voice slider
		this.add.existing(new Slider(Object.assign(DEFAULTS_SLIDER, {
			x: this.width * .5,
			y: this.height * .7,
			key: "volumes.voice",
			title: "Announcers",
			onChanged: (val) =>
			{
				this.game.audio.voice.setVolume(val);
			}
		})));

		// volume-effects slider
		this.add.existing(new Slider(Object.assign(DEFAULTS_SLIDER, {
			x: this.width * .5,
			y: this.height * .8,
			key: "volumes.effects",
			title: "Effects",
			onChanged: (val) =>
			{
				this.game.audio.effects.setVolume(val);
			}
		})));
	}
}

export default Scene_Menu_Settings;
