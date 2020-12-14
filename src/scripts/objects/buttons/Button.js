import * as Phaser from "phaser";

class Button extends Phaser.GameObjects.Container
{
	constructor(data)
	{
		super(data.scene, data.x, data.y);

		this.bg = new Phaser.GameObjects.Image(this.scene, 0, 0, data.texture);
		this.add(this.bg);

		if (data.overlay)
		{
			this.overlay = data.overlay;
			this.add(this.overlay);

			if (this.overlay.image)
				this.overlay.image.setDisplaySize(this.bg.width * .9, this.bg.height * .9);
		}

		if (data.on)
		{
			this.setSize(this.bg.width, this.bg.height)
				.setInteractive();

			for (const [name, handler] of Object.entries(data.on))
				this.on(name, handler);
		}
	}
}

export default Button;
