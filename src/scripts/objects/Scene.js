import * as Phaser from "phaser";

import Scene_Preload from "../scenes/Scene_Preload.js";

class Scene extends Phaser.Scene
{
	static preload(load)
	{
		// Wallpapers
		load.setPath("/assets/img/wallpapers/");
		Scene_Preload.importImageSeries(load, "bg_wallpaper_", 5, "jpg", 0, 2); // bg_wallpaper_00, ...

		// Buttons
		load.setPath("assets/img/buttons/");

		const buttons = [ "back", "createLobby", "exit", "icon_resume", "leaderboard", "pause", "play", "resume", "settings" ];
		for (const asset of buttons)
			load.image(`button_${asset}`, `button_${asset}.png`);
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
