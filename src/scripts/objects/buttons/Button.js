import * as Phaser from "phaser";

import BaseOverlay from "./overlays/BaseOverlay.js";

class Button extends Phaser.GameObjects.Container
{
	static get DEFAULT_HANDLERS()
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

	get overlay()
	{
		return this._overlay;
	}
	set overlay(value)
	{
		if (!(value instanceof BaseOverlay))
			return console.error(new TypeError("Overlay must be a child of BaseOverlay")); // eslint-disable-line

		if (this._overlay != null)
			this.remove(this._overlay, true);

		this._overlay = value;
		this.add(this._overlay);

		if (this._overlay.image)
			this._overlay.image.setDisplaySize(this.bg.width * .9, this.bg.height * .9);
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
		this.scene.add.existing(this);

		this.bg = new Phaser.GameObjects.Image(this.scene, 0, 0, data.texture);
		this.add(this.bg);

		if (data.overlay)
			this.overlay = data.overlay;

		if (data.on
			|| data.defaultButtonEvents
			|| data.defaultButtonHoverEvents
			|| data.defaultButtonClickEvents)
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
				this.on("pointerover", Button.DEFAULT_HANDLERS.pointerover);
				this.on("pointerout", Button.DEFAULT_HANDLERS.pointerout);
			}
			, enableClickEvents = () =>
			{
				this.on("pointerup", Button.DEFAULT_HANDLERS.pointerup);
				this.on("pointerdown", Button.DEFAULT_HANDLERS.pointerdown);
			}
			, enableEvents = () =>
			{
				enableHoverEvents();
				enableClickEvents();
			};

		if (!data.defaultButtonEvents)
		{
			if (data.defaultButtonHoverEvents)
				enableHoverEvents();

			if (data.defaultButtonClickEvents)
				enableClickEvents();
		}

		else
			enableEvents();
	}
}

export default Button;
