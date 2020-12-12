import * as Phaser from "phaser";
import { Menu } from "phaser3-rex-plugins/templates/ui/ui-components.js";

import Setting from "../Setting.js";
import Button from "../../buttons/Button.js";

class Dropdown extends Setting
{
	get value()
	{
		return super.value;
	}
	set value(x)
	{
		super.value = x;
		if (this.valueText)
			this.valueText.text = x;
	}

	get expanded()
	{
		return !!this.menu;
	}

	_composeButtonContainer()
	{
		// instantiate button to get the image dimensions - for positioning the arrow correctly
		let button = new Phaser.GameObjects.Image(this.scene, 0, 0, "dropdown_main")
			, arrow = new Phaser.GameObjects.Image(this.scene, button.displayWidth * .36, 0, "dropdown_arrow");

		const self = this;
		button = new Button({
			scene: this.scene,
			x: 0,
			y: 0,
			texture: "dropdown_main",
			on: {
				pointerover: function()
				{
					this.bg.setTexture("dropdown_main_hover");
					arrow.setRotation(Math.PI); // Phaser uses rAdIANS FOR SOME REASON
				},
				pointerout: function()
				{
					this.bg.setTexture("dropdown_main");
					arrow.setRotation(self.expanded ? Math.PI : 0);
				},
				pointerdown: () =>
				{
					if (!this.expanded)
						this.menu = this._composeMenu();
					else
					{
						this.menu.collapse();
						this.menu = null;
					}
				}
			}
		});

		button.add(arrow)
			.setScale(.75)
			.setDepth(100);

		return button;
	}

	_composeMenu()
	{
		const menu = new Menu(this.scene, {
			items: this.choices,

			x: this.x - (this.element.displayWidth * .25),
			y: this.y + (this.element.displayHeight * .335),

			createButtonCallback: (item, i) =>
			{
				return this.scene.rexUI.add.label({
					background: this.scene.add.image(0, 0, i !== this.choices.length - 1 ? "dropdown_item" : "dropdown_item_last"),
					text: this.scene.add.text(0, 0, item.name, {
						fontFamily: "Arial",
						fontSize: 25
					}).setScale(.75),
					icon: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, (item.name === this.value) ? 0x85C1E9 : 0xFFFFFF),
					space: {
						left: 10,
						right: 10,
						top: 10,
						bottom: 10,
						icon: 10
					}
				})
					.setScale(1.5)
					.setDepth(50);
			},

			easeIn: {
				duration: 500,
				orientation: "y"
			},

			easeOut: {
				duration: 100,
				orientation: "y"
			}
		});

		menu
			.on("button.click", (button) =>
			{
				this.value = button.text;
				this.menu.collapse();
				this.menu = null;
			})
			.on("button.over", (button) =>
			{
				button.children.find(x => x instanceof Phaser.GameObjects.Image).setTexture((this.choices.findIndex(x => x.name === button.text) !== this.choices.length - 1 ) ? "dropdown_item_hover" : "dropdown_item_last_hover");
			})
			.on("button.out", (button) =>
			{
				button.children.find(x => x instanceof Phaser.GameObjects.Image).setTexture((this.choices.findIndex(x => x.name === button.text) !== this.choices.length - 1 ) ? "dropdown_item" : "dropdown_item_last");
			});

		return menu;
	}

	constructor(data)
	{
		super(data);
		this.choices = data.choices;

		// main idle button
		this.element = this._composeButtonContainer();
		this.add(this.element);

		this.menu = null;
		let touchCount = 0;
		this.scene.input.on("pointerdown", (pointer) =>
		{
			if (!this.expanded)
				return touchCount = 0;

			if (!this.menu.isInTouching(pointer) && (++touchCount % 2 === 0))
			{
				this.menu.collapse();
				this.menu = null;
			}
		}, this.scene);

		this.valueText = this.scene.add.text(-this.element.displayWidth * .1, -this.element.displayHeight * .075, this.value, {
			fontFamily: "Arial",
			align: "right",
			fontSize: 28,
			fill: "#ffffff"
		});
		this.valueText.setOrigin(.5);
		this.add(this.valueText);

		if (data.title)
		{
			this.title = this.scene.add.text(-this.element.displayWidth * 1.1, 0, data.title, {
				fontFamily: "Arial",
				align: "left",
				fontSize: 28,
				fill: "#ffffff"
			});
			this.title.setOrigin(.5);
			this.add(this.title);
		}
	}
}

export default Dropdown;
