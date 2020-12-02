import * as Phaser from "phaser";

import Button from "../objects/buttons/Button.js";

class Scene_Menu_Main extends Phaser.Scene
{
	constructor()
	{
		super({ key: "Scene_Menu_Main" });

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
				this.bg.setTint(0xff0000);
			},
			pointerout: function()
			{
				this.bg.clearTint();
			},
			pointerup: function()
			{
				this.bg.clearTint();
			}
		};
	}

	create(data = {})
	{
		/* Wallpaper */
		this.wallpaper = new Phaser.GameObjects.Image(this, this.cameras.main.width/2, this.cameras.main.height/2, `bg_wallpaper_0${Math.floor(Math.random() * 4)}`).setDepth(0);
		this.wallpaper.setScale(0.7111);
		this.add.existing(this.wallpaper);

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

			this.scene.start("Scene_Game");
		});
	}

	update()
	{

	}
}

export default Scene_Menu_Main;
