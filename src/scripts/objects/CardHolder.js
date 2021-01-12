import * as Phaser from "phaser";

import { BUTTON_WIDTH } from "../globals.js";
import Card from "./Card.js";

class CardHolder extends Phaser.GameObjects.Container
{
	constructor(cardsAmount, scene, x, y)
	{
		super(scene, x, y);

		this.cards = [];
		const getCardPosition = (amount, padding = 0) =>
		{
			padding /= 2;
			const CARD_WIDTH = BUTTON_WIDTH * 5 / 2
				, CARD_HEIGHT = BUTTON_WIDTH * 6 / 2;

			if (amount === 1)
				return [{
					x: 0,
					y: 0,
					scale: .75
				}];

			if (amount === 2)
				return [
					{
						x: 0 - (CARD_WIDTH / 2) - padding * 3,
						y: 0,
						scale: .6
					},
					{
						x: 0 + (CARD_WIDTH / 2) + padding * 3,
						y: 0,
						scale: .6
					}
				];

			if (amount === 3)
				return [
					{
						x: 0 - (CARD_WIDTH / 2) - padding,
						y: 0,
						scale: .5
					},
					{
						x: 0 + (CARD_WIDTH / 2) + padding,
						y: 0,
						scale: .5
					},
					{
						x: 0,
						y: CARD_HEIGHT + padding,
						scale: .5
					}
				];

			if (amount === 4)
				return [
					{
						x: 0 - (CARD_WIDTH / 2) - padding,
						y: 0,
						scale: .5
					},
					{
						x: 0 + (CARD_WIDTH / 2) + padding,
						y: 0,
						scale: .5
					},
					{
						x: 0 - (CARD_WIDTH / 2) - padding,
						y: 0 + CARD_HEIGHT + padding,
						scale: .5
					},
					{
						x: 0 + (CARD_WIDTH / 2) + padding,
						y: 0 + CARD_HEIGHT + padding,
						scale: .5
					}
				];
		};

		const layouts = getCardPosition(cardsAmount, 50);
		for (let i = 0; i < cardsAmount; i++)
		{
			const card = new Card(this.scene, layouts[i].x, layouts[i].y);
			card.setScale(layouts[i].scale);

			this.add(card);
			this.cards.push(card);
		}

		this.setScale(.6);
	}
}

export default CardHolder;
