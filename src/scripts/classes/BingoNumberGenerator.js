import { BINGO } from "../globals.js";

class BingoNumberGenerator
{
	constructor(maxPerColumn = 15)
	{
		this.maxPerColumn = maxPerColumn;
		this.max = BINGO * maxPerColumn;
		this.usedNumbers = [];
	}

	random(column = null)
	{
		if (column && (typeof column) === "string")
			column.toUpperCase();

		let number;
		do
		{
			if (column == null || (column && !BINGO.includes(column)))
				number = Math.floor(Math.random() * this.max);
			else
				number = (BINGO.indexOf(column) * this.maxPerColumn) + Math.floor(Math.random() * this.maxPerColumn);
		} while (this.usedNumbers.includes(number));

		this.usedNumbers.push(number);
		return number;
	}
}

export default BingoNumberGenerator;
