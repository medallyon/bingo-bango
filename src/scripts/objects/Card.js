import * as Phaser from "phaser";

import { BINGO, BUTTON_WIDTH } from "../globals.js";
import BingoNumberGenerator from "../classes/BingoNumberGenerator.js";
import Button from "./buttons/Button.js";
import TextOverlay from "./buttons/overlays/TextOverlay.js";
import ImageOverlay from "./buttons/overlays/ImageOverlay.js";

class Card extends Phaser.GameObjects.Container
{
	_generateBingoRow()
	{
		const BINGO_ROW_START_X = 0 - (Math.floor(BINGO.length / 2) * BUTTON_WIDTH)
			, BINGO_ROW_START_Y = 0;

		for (let i = 0; i < BINGO.length; i++)
		{
			const button = new Button({
				scene: this.scene,
				x: BINGO_ROW_START_X + (BUTTON_WIDTH * i),
				y: BINGO_ROW_START_Y,
				texture: `tile_${BINGO[i]}`
			});

			this.add(button);
			this.buttons.bingo.push(button);
		}
	}

	_generateCardButtons()
	{
		const ROW_START_X = 0 - (Math.floor(BINGO.length / 2) * BUTTON_WIDTH)
			, ROW_START_Y = BUTTON_WIDTH;

		for (let i = 0; i < BINGO.length; i++)
		{
			const column = BINGO[i];
			for (let j = 0; j < this.colLength; j++)
			{
				let randomNumber = this.bingoNumbers.random(column)
					, button;

				// skip center center button
				if (i === Math.floor(BINGO.length / 2) && j === Math.floor(this.colLength / 2))
				{
					button = new Button({
						scene: this.scene,
						x: ROW_START_X + (i * BUTTON_WIDTH),
						y: ROW_START_Y + (j * BUTTON_WIDTH),
						texture: `bg_tile_${BINGO[i]}`,
						overlay: new ImageOverlay(this.scene, "coin"),
						on: {
							pointerup: function()
							{
								this.overlay.wobble(.65);
							}
						}
					});
				}

				else
				{
					button = new Button({
						scene: this.scene,
						x: ROW_START_X + (i * BUTTON_WIDTH),
						y: ROW_START_Y + (j * BUTTON_WIDTH),
						texture: `bg_tile_${BINGO[i]}`,
						overlay: new TextOverlay(this.scene, randomNumber.toString()),
						on: {
							pointerup: function()
							{
								console.log(`Clicked on ${this.overlay.text.text}`);
								this.overlay.wobble(.65);
							}
						}
					});
				}

				this.buttons.numbers[column].push(button);
				this.add(button);
			}
		}
	}

	constructor(scene, x, y, colLength = 5)
	{
		super(scene, x, y);
		this.colLength = colLength;

		this.bingoNumbers = new BingoNumberGenerator();
		this.buttons = {
			bingo: [],
			numbers: {
				"B": [],
				"I": [],
				"N": [],
				"G": [],
				"O": []
			}
		};

		this._generateBingoRow();
		this._generateCardButtons();
	}
}

export default Card;
