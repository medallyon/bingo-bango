import * as Phaser from "phaser";

import { BINGO } from "../globals.js";
import Button from "./Button.js";
import BingoNumberGenerator from "../classes/BingoNumberGenerator.js";

class Card extends Phaser.GameObjects.Container
{
	/* eslint-disable brace-style */

	static get BUTTON_WIDTH() { return 100; }

	/* eslint-enable brace-style */

	_generateBingoRow()
	{
		const BINGO_ROW_START_X = 0 - (Math.floor(BINGO.length / 2) * (Card.BUTTON_WIDTH / 2))
			, BINGO_ROW_START_Y = 0;

		for (let i = 0; i < BINGO.length; i++)
		{
			const button = new Button(this, BINGO_ROW_START_X + (Card.BUTTON_WIDTH * i / 2), BINGO_ROW_START_Y, `bg_bingo${i + 1}`);

			this.add(button);
			this.buttons.bingo.push(button);
		}
	}

	_generateCardButtons()
	{
		const ROW_START_X = 0 - (Math.floor(BINGO.length / 2) * (Card.BUTTON_WIDTH / 2))
			, ROW_START_Y = Card.BUTTON_WIDTH / 2;

		for (let i = 0; i < BINGO.length; i++)
		{
			const column = BINGO[i];
			for (let x = 0; x < this.colLength; x++)
			{
				const card = this
					, randomNumber = this.bingoNumbers.random(column)
					, button = new Button(this, ROW_START_X + (i * Card.BUTTON_WIDTH / 2), ROW_START_Y + (x * Card.BUTTON_WIDTH / 2), `bg_numberTile${i + 1}`, randomNumber.toString(), function()
					{
						console.log(`Clicked on ${this.text.text}`);
					});

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

		scene.add.existing(this, x, y);
	}
}

export default Card;
