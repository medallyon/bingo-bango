import * as Phaser from "phaser";

class Scene extends Phaser.Scene
{
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

		this.wallpaper = config.wallpaper;
	}

	create()
	{
		if (this.wallpaper)
		{
			this.wallpaper = new Phaser.GameObjects.Image(this, this.width / 2, this.height / 2, (typeof this.wallpaper === "boolean") ? `bg_wallpaper_0${Math.floor(Math.random() * 4)}` : this.wallpaper);
			// assuming wallpaper size : 1800 x 1200
			this.wallpaper.setScale(0.7111);
			this.add.existing(this.wallpaper);
		}
	}
}

export default Scene;
