import { Slider as RexSlider } from "phaser3-rex-plugins/templates/ui/ui-components.js";

import Setting from "../Setting.js";

class Slider extends Setting
{
	static preload(load)
	{
		load.setPath("assets/img/buttons/");
		load.image("slider_knob", "slider.png");
	}

	get value()
	{
		return super.value;
	}
	set value(x)
	{
		super.value = x;
		if (this.valueText)
			this.valueText.text = `${(this.value * 100).toFixed()}%`;
	}

	constructor(data)
	{
		super(data);

		const config = Object.assign({
			x: data.x,
			y: data.y,

			width: this.width * .4, // length
			height: 20, // thiccness

			value: this.value, // active value
			valuechangeCallback: val => // on change
			{
				this.value = val;
			},

			orientation: "x", // "x" or "y" - down or sideways
			input: "drag", // "drag" or "click",

			track: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xFDFEFE), // background bar
			indicator: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x85C1E9), // background active bar
			thumb: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x1A5276), // slider button
		}, data.element);

		// override event when supplied in data to both execute default & custom handlers
		if (data.valuechangeCallback)
		{
			config.valuechangeCallback = (val) =>
			{
				this.value = val;
				data.valuechangeCallback(val);
			};
		}

		this.element = new RexSlider(this.scene, config);
		this.element.layout();

		if (data.title)
		{
			this.title = this.scene.add.text(-data.element.width * .45, -data.element.height * 1.5, data.title, {
				fontFamily: "Arial",
				align: "left",
				fontSize: 28,
				fill: "#ffffff"
			});
			this.title.setOrigin(0, .5);
			this.add(this.title);
		}

		this.valueText = this.scene.add.text(data.element.width * .45, -data.element.height * 1.5, `${(this.value * 100).toFixed()}%`, {
			fontFamily: "Arial",
			align: "right",
			fontSize: 28,
			fill: "#ffffff"
		});
		this.valueText.setOrigin(1, .5);
		this.add(this.valueText);
	}
}

export default Slider;
