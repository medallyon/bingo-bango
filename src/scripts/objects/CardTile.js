import * as Phaser from "phaser";

import Button from "./buttons/Button.js";
import ImageOverlay from "./buttons/overlays/ImageOverlay.js";
import TextOverlay from "./buttons/overlays/TextOverlay.js";

class CardTile extends Button
{
	static get BASE_SCORE()
	{
		return 50;
	}

	constructor(data)
	{
		super(Object.assign(data, {
			overlay: new TextOverlay(data.scene, data.number.toString(), {
				text: {
					fontSize: 80,
					fontStyle: "bold"
				}
			}),
			defaultButtonHoverEvents: true,
			defaultButtonClickEvents: true
		}));

		this.overlay.text.setStroke("#000", 6);

		this.card = data.card;
		this.number = data.number;
		this.completed = false;

		this.on("pointerup", () =>
		{
			console.log(`Clicked on ${this.overlay.text.text}`);
			this.overlay.wobble(.65);

			this.card.play(this.number);
		});
	}

	complete()
	{
		this.completed = true;
		this.removeAllListeners();
		this.overlay = new ImageOverlay(this.scene, "star").setScale(.8);
		this.scene.score.tracker.score += CardTile.BASE_SCORE;
		// TODO: Play 'completed' animation on tile
		// TODO: Play 'completed' sound in "effects" channel
	}
}

export default CardTile;
