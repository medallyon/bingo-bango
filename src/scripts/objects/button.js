import * as Phaser from "phaser";

class Button extends Phaser.GameObjects.Container
{
	constructor(card, x = 0, y = 0, sprite = "", text = null, clickCallback = null)
	{
		super(card.scene, x, y);
		this.card = card;

		this.bg = new Phaser.GameObjects.Sprite(this.scene, x, y, sprite);
		this.bg.setDepth(-100);

		this.add(this.bg);

		if (text != null)
		{
			this.text = new Phaser.GameObjects.Text(this.scene, 0, 0, text, {
				align: "center",
				fontSize: 64
			})
				.setOrigin(.5, .5)
				.setResolution(.5);
			this.add(this.text);
		}

		if (clickCallback != null)
			this.setSize(100, 100)
				.setInteractive()
				.on("pointerup", clickCallback);

		this.setScale(.5);
	}
}

export default Button;
