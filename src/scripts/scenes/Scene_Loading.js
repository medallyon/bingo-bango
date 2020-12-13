import * as Phaser from "phaser";

import Scene from "../objects/Scene.js";
class Scene_Loading extends Scene
{
	constructor()
	{
		super({
			key: "Scene_Loading",
			wallpaper: true
		});
	}
	preload()
	{
		var progressBar = this.add.graphics();
		var progressBox = this.add.graphics();
		progressBox.fillStyle(0x000000, 0.8);
		progressBox.fillRect(450, 300, 400, 50);
		var width = this.cameras.main.width;
		var height = this.cameras.main.height;
		var loadingText = this.make.text({
			x: width / 2,
			y: height / 2.2 - 50,
			text: "Loading...",
			style:
			{
				font: "20px monospace",
				fill: "#000000"
			}
		});
		loadingText.setOrigin(0.5, 0.5);

		var percentText =  this.make.text({
			x: width / 2,
			y: height / 2.18 - 5,
			text: "0%",
			style: {
				font: "18px monospace",
				fill: "#ffffff"
			}
		});
		percentText.setOrigin(0.5, 0.5);
		this.load.on("progress", function (value)
		{
			percentText.setText(parseInt(value * 100) + "%");
			progressBar.clear();
			progressBar.fillStyle(0x000000, 1);
			progressBar.fillRect(460, 310, 380 * value, 30);
		});
		this.load.on("complete", function ()
		{
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
		});
		this.load.image("logo", "logo.png");
		for (var i = 0; i < 1500; i++)
		{
			this.load.image("logo"+i, "logo.png");
		}
	}
	create(data = {})
	{
		super.create(data);
		this.connection = this.game.connection;
		this.scene.start("Scene_Menu_Main");
	}
	update()
	{

	}
}
export default Scene_Loading;
