import * as Phaser from "phaser";

class Scene extends Phaser.Scene
{
	static preload(load)
	{
		load.setPath("assets/img/buttons");

		load.image("button_back", "button_back.png");
		load.image("button_createLobby", "button_createLobby.png");
		load.image("button_exit", "button_exit.png");
		load.image("button_icon_resume", "button_icon_resume.png");
		load.image("button_leaderboard", "button_leaderboard.png");
		load.image("button_pause", "button_pause.png");
		load.image("button_play", "button_play.png");
		load.image("button_resume", "button_resume.png");
		load.image("button_settings", "button_settings.png");
	}

	get width()
	{
		return this.cameras.main.width;
	}
	get height()
	{
		return this.cameras.main.height;
	}

	constructor(config)
	{
		console.log(config);
		super(config);
		this.key = config.key;

		this.wallpaper = config.wallpaper;
	}

	_generateWallpaper()
	{
		if (this.wallpaper)
		{
			this.wallpaper = new Phaser.GameObjects.Image(this, this.width / 2, this.height / 2, (typeof this.wallpaper === "boolean") ? `bg_wallpaper_0${Math.floor(Math.random() * 4)}` : this.wallpaper);
			// assuming wallpaper size : 1800 x 1200
			this.wallpaper.setScale(0.7111);
			this.add.existing(this.wallpaper);
		}
	}

	create()
	{
		this._generateWallpaper();
	}

	resume()
	{
		this._generateWallpaper();
	}
}

export default Scene;
