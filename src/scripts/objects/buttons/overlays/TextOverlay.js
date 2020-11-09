import * as Phaser from "phaser";

import ButtonOverlay from "./ButtonOverlay.js";

class TextOverlay extends ButtonOverlay
{
	constructor(scene, text, textOptions = {})
	{
		super(scene);

		this.text = new Phaser.GameObjects.Text(this.scene, 0, 0, text, Object.assign({
			align: "center",
			fontSize: 64
		}, textOptions))
			.setOrigin(.5, .5)
			.setResolution(1);
		this.add(this.text);
	}
}

export default TextOverlay;
