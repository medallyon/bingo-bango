import * as Phaser from "phaser";

import ButtonOverlay from "./ButtonOverlay.js";

class ImageOverlay extends ButtonOverlay
{
	constructor(scene, texture, data = { image: {} })
	{
		super(Object.assign({ scene }, data));

		this.image = new Phaser.GameObjects.Image(this.scene, 0, 0, texture);
		this.add(this.image);
	}
}

export default ImageOverlay;
