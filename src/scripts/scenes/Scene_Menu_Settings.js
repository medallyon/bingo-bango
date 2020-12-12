import * as Phaser from "phaser";

import Scene from "../objects/Scene.js";
import Slider from "../objects/settings/variations/Slider.js";
import Dropdown from "../objects/settings/variations/Dropdown.js";
import Button from "../objects/buttons/Button.js";
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
		super.create(data);

		/* Setting Panel Background */
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.50, "panel_settings")
			.setScale(0.7);

		/* Dropdown Menus */

		this.add.existing(new Dropdown({
			scene: this,
			x: this.width * .6,
			y: this.height * .35,
			key: "voicepack",
			title: "Announcer Pack",
			choices: [{
				name: "deyan"
			}]
		}));

		/* Back Button */

		for (let i = 0; i < Object.keys(this.buttons).length; i++)
		{
			const key = Object.keys(this.buttons)[i]
				, btn = new Button({
					scene: this,
					x: this.game.renderer.width * .09,
					y: this.game.renderer.height * (0.95 + (i * .175)),
					texture: `button_${key}`,
					on: this._defaultButtonHandlers
				});

			btn.setScale(.5);
			this.add.existing(this.buttons[key] = btn);
		}

		this.buttons.back.on("pointerup", (pointer) =>
		{
			// left mouse button
			if (pointer.button !== 0)
				return;

			this.scene.start("Scene_Menu_Main", {
				previousScene: "Scene_Menu_Settings"
			});
		});

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
