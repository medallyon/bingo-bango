import * as Phaser from "phaser";

class ButtonOverlay extends Phaser.GameObjects.Container
{
	constructor(scene)
	{
		if (new.target === ButtonOverlay)
			throw new TypeError("Cannot construct ButtonOverlay instances directly");

		super(scene, 0, 0);

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
			scale: 2,
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

export default ButtonOverlay;
