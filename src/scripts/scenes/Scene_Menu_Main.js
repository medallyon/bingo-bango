import * as Phaser from "phaser";

import Scene from "../objects/Scene.js";
import Button from "../objects/buttons/Button.js";

class Scene_Menu_Main extends Scene
{
	constructor()
	{
		super({
			key: "Scene_Menu_Main",
			wallpaper: true
		});

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
		super.create(data);

		/* Logo */
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.25, "logo").setScale(0.5);

		/* Buttons */
		for (let i = 0; i < Object.keys(this.buttons).length; i++)
		{
			const key = Object.keys(this.buttons)[i]
				, btn = new Button({
					scene: this,
					x: this.game.renderer.width * .5,
					y: this.game.renderer.height * (.5 + (i * .175)),
					texture: `button_${key}`,
					on: this._defaultButtonHandlers
				});

			btn.setScale(.69);
			this.add.existing(this.buttons[key] = btn);
		}

		this.buttons.play.on("pointerup", (pointer) =>
		{
			// left mouse button
			if (pointer.button !== 0)
				return;

			this.scene.start("Scene_Game", {
				previousScene: "Scene_Menu_Main"
			});
		});

		this.buttons.settings.on("pointerup", (pointer) =>
		{
			// left mouse button
			if (pointer.button !== 0)
				return;

			this.scene.start("Scene_Menu_Settings", {
				previousScene: "Scene_Menu_Main"
			});
		});
	}

	update()
	{

	}
}

export default Scene_Menu_Main;
