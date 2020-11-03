import * as Phaser from "phaser";

import ButtonOverlay from "./ButtonOverlay.js";

class ImageOverlay extends ButtonOverlay
{
	constructor(scene, texture)
	{
		super(scene);

		this.image = new Phaser.GameObjects.Image(this.scene, 0, 0, texture);
		this.add(this.image);
	}
}

export default ImageOverlay;
