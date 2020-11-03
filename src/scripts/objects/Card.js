import * as Phaser from "phaser";

import { BINGO, BUTTON_WIDTH } from "../globals.js";
import Button from "./Button.js";
import BingoNumberGenerator from "../classes/BingoNumberGenerator.js";

class Card extends Phaser.GameObjects.Container
{
	_generateBingoRow()
	{
		const BINGO_ROW_START_X = 0 - (Math.floor(BINGO.length / 2) * BUTTON_WIDTH)
			, BINGO_ROW_START_Y = 0;

		for (let i = 0; i < BINGO.length; i++)
		{
			const button = new Button(this.scene, BINGO_ROW_START_X + (BUTTON_WIDTH * i), BINGO_ROW_START_Y, `bg_bingo${i + 1}`);

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
			for (let x = 0; x < this.colLength; x++)
			{
				let randomNumber = this.bingoNumbers.random(column)
					, button;

				// skip center center button
				if (i === Math.floor(BINGO.length / 2) && x === Math.floor(this.colLength / 2))
				{
					button = new Button(this.scene, ROW_START_X + (i * BUTTON_WIDTH), ROW_START_Y + (x * BUTTON_WIDTH), `bg_numberTile${i + 1}`, null, null);
				}

				else
				{
					button = new Button(this.scene, ROW_START_X + (i * BUTTON_WIDTH), ROW_START_Y + (x * BUTTON_WIDTH), `bg_numberTile${i + 1}`, randomNumber.toString(), function()
					{
						console.log(`Clicked on ${this.text.text}`);
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
