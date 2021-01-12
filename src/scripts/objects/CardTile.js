import * as Phaser from "phaser";

import Button from "./buttons/Button.js";
import TextOverlay from "./buttons/overlays/TextOverlay.js";

class CardTile extends Button
{
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

	play()
	{

	}
}

export default CardTile;
