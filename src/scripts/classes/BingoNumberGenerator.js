import { BINGO } from "../globals.js";

/**
 * @class Handles the random generation of bingo numbers
 */
class BingoNumberGenerator
{
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
