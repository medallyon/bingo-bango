import { BINGO } from "../globals.js";

/**
 * @class Handles the random generation of bingo numbers
 */
class BingoNumberGenerator
{
	get B()
	{
		return new Array(this.maxPerColumn).fill(0).map((x, i) => this.maxPerColumn * 0 + i + 1);
	}
	get I()
	{
		return new Array(this.maxPerColumn).fill(0).map((x, i) => this.maxPerColumn * 1 + i + 1);
	}
	get N()
	{
		return new Array(this.maxPerColumn).fill(0).map((x, i) => this.maxPerColumn * 2 + i + 1);
	}
	get G()
	{
		return new Array(this.maxPerColumn).fill(0).map((x, i) => this.maxPerColumn * 3 + i + 1);
	}
	get O()
	{
		return new Array(this.maxPerColumn).fill(0).map((x, i) => this.maxPerColumn * 4 + i + 1);
	}

	getLetter(number) { return this.getColumn(number); }
	/**
	 * @param {number} number - A valid number in the current bingo generator configuration
	 * @return {string} - The letter in the "BINGO" column that the number corresponds to
	 */
	getColumn(number)
	{
		// subtract a single fraction so that the last number in this configuration is included
		return BINGO[Math.floor((number / this.maxPerColumn) - (1 / this.maxPerColumn))];
	}

	/**
	 * @param {number} [maxPerColumn=15] - The maximum amount of numbers that can be present in a BINGO column
	 */
	constructor(maxPerColumn = 15)
	{
		this.maxPerColumn = maxPerColumn;
		this.max = BINGO * maxPerColumn;
		this.usedNumbers = [];
	}

	/**
	 * @param {string} [column] - If specified, retrieves a number from the desired BINGO column
	 * @return {object} - Retrieves a random, not yet called, number from the available pool of Bingo Numbers. Ensures that numbers cannot be duplicate.
	 */
	random(column = null)
	{
		if (column != null && (typeof column) === "string")
			column = column.toUpperCase();
		else
			column = BINGO[Math.floor(Math.random() * BINGO.length)];

		let number;
		do
		{
			number = 1 + (BINGO.indexOf(column) * this.maxPerColumn) + Math.floor(Math.random() * this.maxPerColumn);
		} while (this.usedNumbers.includes(number));

		this.usedNumbers.push(number);
		return { column, number };
	}
}

export default BingoNumberGenerator;
