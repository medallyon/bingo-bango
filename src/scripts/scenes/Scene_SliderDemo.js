import * as Phaser from "phaser";

class Scene_SliderDemo extends Phaser.Scene
{
	constructor()
	{
		super({
			key: "Scene_SliderDemo"
		});
	}

	preload()
	{
		var url;
  
		url = "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsliderplugin.min.js";
		this.load.plugin("rexsliderplugin", url, true);

		url = "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/white-dot.png";      
		this.load.image("dot", url);
	}

	create(data = {})
	{
		this.img = this.add.image(400, 300, "dot").setScale(10, 10);
		this.img.slider = this.plugins.get("rexsliderplugin").add(this.img, {
			value: 0.25,
			endPoints: [
				{
					x: this.img.x - 200,
					y: this.img.y - 200
				},
				{
					x: this.img.x + 200,
					y: this.img.y + 200
				}
			]
		});

		this.add.graphics()
			.lineStyle(3, 0x55ff55, 1)
			.strokePoints(this.img.slider.endPoints);

		this.cursorKeys = this.input.keyboard.createCursorKeys();
	}

	update()
	{
		if (this.cursorKeys.left.isDown)
			this.img.slider.value -= 0.01;
		else if (this.cursorKeys.right.isDown)
			this.img.slider.value += 0.01;

		console.log(this.img.slider.value);
	}
}

export default Scene_SliderDemo;
