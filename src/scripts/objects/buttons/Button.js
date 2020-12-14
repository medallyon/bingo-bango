import * as Phaser from "phaser";

class Button extends Phaser.GameObjects.Container
{
	get _defaultButtonHandlers()
	{
		return {
			pointerover: function()
			{
				this.bg.setTint(0XDDDDDD);
			},
			pointerout: function()
			{
				this.bg.clearTint();
			},
			pointerdown: function()
			{
				this.bg.setTint(0X777777);
			},
			pointerup: function()
			{
				this.bg.setTint(0XDDDDDD);
				this.scene.game.audio.play("audio_button_01", "effects");
			}
		};
	}

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

		this.setSize(this.bg.width, this.bg.height)
			.setInteractive();

		// register defined event handlers, either with custom functions or based on bools
		for (const [name, handler] of Object.entries(data.on || {}))
		{
			if ((typeof handler) === "function")
				this.on(name, handler);
			else if (handler && this._defaultButtonHandlers[name])
				this.on(name, this._defaultButtonHandlers[name]);
		}

		// add default event handlers if they haven't been overwritten
		for (const [name, handler] of Object.entries(this._defaultButtonHandlers))
		{
			if (!this.eventNames()[name])
				this.on(name, handler);
		}
	}
}

export default Button;
