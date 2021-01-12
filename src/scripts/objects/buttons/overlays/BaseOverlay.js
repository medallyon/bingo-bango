import * as Phaser from "phaser";

class BaseOverlay extends Phaser.GameObjects.Container
{
	constructor(data)
	{
		if (new.target === BaseOverlay)
			throw new TypeError("Cannot construct BaseOverlay instances directly");

		super(data.scene, data.x, data.y);

		this.text = null;
		this.image = null;

		this.wobbling = null;
	}

	wobble(duration = 1, loop = 1)
	{
		if (this.wobbling != null)
			return console.warn("Cannot wobble while wobbling is active");

		duration = duration / 2 * 1000;
		this.wobbling = this.scene.tweens.add({
			targets: this,
			scale: 1.5,
			ease: Phaser.Math.Easing.Sine.InOut,
			yoyo: true,
			loop, duration,
			onComplete: () =>
			{
				this.wobbling = null;
			}
		});
	}
}

export default BaseOverlay;
