import * as Phaser from "phaser";

import ButtonOverlay from "./ButtonOverlay.js";

class TextOverlay extends ButtonOverlay
{
	constructor(scene, text)
	{
		super(scene);

		this.text = new Phaser.GameObjects.Text(this.scene, 0, 0, text, {
			align: "center",
			fontSize: 64
		})
			.setOrigin(.5, .5)
			.setResolution(.75);
		this.add(this.text);
	}
}

export default TextOverlay;
