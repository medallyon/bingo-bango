import * as Phaser from "phaser";

import { BINGO, BUTTON_WIDTH } from "../globals.js";
import BingoNumberGenerator from "../classes/BingoNumberGenerator.js";
import Button from "./buttons/Button.js";
import CardTile from "./CardTile.js";
import ImageOverlay from "./buttons/overlays/ImageOverlay.js";

class Card extends Phaser.GameObjects.Container
{
	static preload(load)
	{
		load.setPath("assets/img/card/");

		// BINGO Tiles
		for (let i = 0; i < 5; i++)
			load.image(`tile_${BINGO[i]}`, `tile_${BINGO[i]}.png`);

		// Button Tile Backgrounds
		for (let i = 0; i < 5; i++)
			load.image(`bg_tile_${BINGO[i]}`, `bg_tile_${BINGO[i]}.png`);
	}

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

	_generateCardTiles()
	{
		const ROW_START_X = 0 - (Math.floor(BINGO.length / 2) * BUTTON_WIDTH)
			, ROW_START_Y = BUTTON_WIDTH;

		for (let x = 0; x < BINGO.length; x++)
		{
			const column = BINGO[x];
			for (let y = 0; y < this.colLength; y++)
			{
				const { number } = this.generator.random(column);
				let button;

				// skip (center, center) button
				if (x === Math.floor(BINGO.length / 2) && y === Math.floor(this.colLength / 2))
				{
					button = new Button({
						scene: this.scene,
						x: ROW_START_X + (x * BUTTON_WIDTH),
						y: ROW_START_Y + (y * BUTTON_WIDTH),
						texture: `bg_tile_${BINGO[x]}`,
						overlay: new ImageOverlay(this.scene, "star").setScale(.8)
					});
				}

				else
				{
					button = new CardTile({
						card: this,
						scene: this.scene,
						x: ROW_START_X + (x * BUTTON_WIDTH),
						y: ROW_START_Y + (y * BUTTON_WIDTH),
						texture: `bg_tile_${BINGO[x]}`,
						number
					});
				}

				this.buttons.tiles[column].push(button);
				this.add(button);
			}
		}
	}

	constructor(scene, x, y, colLength = 5)
	{
		super(scene, x, y);
		this.colLength = colLength;

		this.generator = new BingoNumberGenerator();
		this.bingos = {
			columns: [],
			rows: []
		};
		this.buttons = {
			bingo: [],
			tiles: {
				"B": [],
				"I": [],
				"N": [],
				"G": [],
				"O": []
			}
		};

		this._generateBingoRow();
		this._generateCardTiles();
	}

	_getTile(number)
	{
		for (const column of Object.values(this.buttons.tiles))
		{
			const tile = column.find(x => x.number === number);
			if (!tile)
				continue;

			return tile;
		}

		return null;
	}

	_getTileAt(x, y)
	{
		console.log(BINGO[x], y);
		return this.buttons.tiles[BINGO[x]][y];
	}

	_getCoordinate(number)
	{
		const column = BINGO[Math.floor((Math.max(0, number) - 1) / this.generator.maxPerColumn)]
			, index = this.buttons.tiles[column].findIndex(tile => tile.number === number);

		if (index === -1)
			return null;

		return {
			x: BINGO.indexOf(column),
			y: index
		};
	}

	_determineBingo(tile)
	{
		const { x, y } = this._getCoordinate(tile.number);
		console.log(x, y);

		// horizontal
		let horizontal = [];
		for (let i = 0; i < this.colLength; i++)
		{
			const tile = this._getTileAt(i, y);
			if (tile.completed)
				horizontal.push(tile);
		}

		// vertical
		let vertical = [];
		for (let i = 0; i < this.buttons.bingo.length; i++)
		{
			const tile = this._getTileAt(x, i);
			if (tile.completed)
				vertical.push(tile);
		}

		if (horizontal.length === this.buttons.bingo.length)
			this.bingos.rows.push(y);

		if (vertical.length === this.buttons.bingo.length)
			this.bingos.columns.push(x);

		return {
			horizontal: horizontal.length === this.colLength ? horizontal : null,
			vertical: vertical.length === this.buttons.bingo.length ? vertical : null
		};
	}

	// returns the amount of bingos achieved
	play(number)
	{
		const tile = this._getTile(number);

		// number exists as tile on this card
		if (!tile)
			return console.warn("Attempted to play() a non-existing number on Card");

		// number exists as an active ball in the BallQueue
		if (!this.scene.queue.balls.some(b => b.number === number))
			return console.warn("Clicked on a number not present in the BallQueue");

		tile.complete();
		return Object.values(this._determineBingo(tile)).filter(x => x != null).length;
	}
}

export default Card;
