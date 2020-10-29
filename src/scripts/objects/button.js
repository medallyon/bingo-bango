import * as Phaser from "phaser";

class Button extends Phaser.GameObjects.Container
{
	constructor(scene, x = 0, y = 0, sprite = "", text = null, clickCallback = null)
	{
		super(scene, x, y);

		this.bg = new Phaser.GameObjects.Image(this.scene, 0, 0, sprite);
		this.add(this.bg);

		if (text != null)
		{
			this.text = new Phaser.GameObjects.Text(this.scene, 0, 0, text, {
				align: "center",
				fontSize: 64
			})
				.setOrigin(.5, .5)
				.setResolution(.75);
			this.add(this.text);
		}

		if (clickCallback != null)
			this.setSize(this.bg.width, this.bg.height)
				.setInteractive()
				.on("pointerup", clickCallback);
	}
}

export default Button;
