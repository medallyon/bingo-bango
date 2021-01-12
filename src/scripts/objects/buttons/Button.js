import * as Phaser from "phaser";

class Button extends Phaser.GameObjects.Container
{
	get _defaultButtonHandlers()
	{
		// functions here are bound to the Button they originate from
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
				this.scene.game.audio.effects.play("audio_button_01");
			}
		};
	}

	/**
	 * @class A default button for anything clickable
	 * @param {object} data
	 * @param {Phaser.Scene} data.scene
	 * @param {number} [data.x] The x coordinate in the scene
	 * @param {number} [data.y] The y coordinate in the scene
	 * @param {string} data.texture The texture name of the button background
	 * @param {object} [data.overlay]
	 * @param {ImageOverlay} [data.overlay.image] An Image Overlay, displayed as a separate element on top of the button
	 * @param {TextOverlay} [data.overlay.text] A Text Overlay, displayed as a separate element on top of the button
	 * @param {object} [data.on]
	 * @param {function} [data.on.[event]] Optional event handlers that the Phaser Container listens to
	 * @param {bool} [data.defaultButtonHoverEvents] Creates default button event handlers for hovers
	 * @param {bool} [data.defaultButtonClickEvents] Creates default button event handlers for clicks
	 */
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

		// register defined event handlers
		for (const [name, handler] of Object.entries(data.on || {}))
		{
			if ((typeof handler) === "function")
				this.on(name, handler);
		}

		const enableHoverEvents = () =>
			{
				this.on("pointerover", this._defaultButtonHandlers.pointerover);
				this.on("pointerout", this._defaultButtonHandlers.pointerout);
			}
			, enableClickEvents = () =>
			{
				this.on("pointerup", this._defaultButtonHandlers.pointerup);
				this.on("pointerdown", this._defaultButtonHandlers.pointerdown);
			};

		if (!data.defaultButtonEvents)
		{
			if (data.defaultButtonHoverEvents)
				enableHoverEvents();

			if (data.defaultButtonClickEvents)
				enableClickEvents();
		}

		else
		{
			enableHoverEvents();
			enableClickEvents();
		}
	}
}

export default Button;
