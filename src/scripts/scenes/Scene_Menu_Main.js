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

	create(data = {})
	{
		super.create(data);

		// FIXME: Plays at full volume until the Settings Scene is loaded. Figure out why and/or how to fix it.
		this.game.audio.music.play("audio_music_bg_02");

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
					texture: `button_${key}`
				});

			btn.setScale(.69);
			this.add.existing(this.buttons[key] = btn);
		}

		this.buttons.play.on("pointerup", (pointer) =>
		{
			// left mouse button
			if (pointer.button !== 0)
				return;

			this.scene.sleep();
			this.scene.run("Scene_Game");
		});

		this.buttons.settings.on("pointerup", (pointer) =>
		{
			// left mouse button
			if (pointer.button !== 0)
				return;

			this.scene.sleep();
			this.scene.run("Scene_Settings");
		});

		this.buttons.leaderboard.on("pointerup", (pointer) =>
		{
			// left mouse button
			if (pointer.button !== 0)
				return;

			this.scene.sleep();
			this.scene.run("Scene_Leaderboard");
		});
	}

	update()
	{

	}
}

export default Scene_Menu_Main;
