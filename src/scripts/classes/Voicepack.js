import { BINGO } from "../globals.js";

/*
 * Callout <- Array
 * A Callout is an array that contains variations for a single Callout.
 * If a Callout is requested for "B6", it will return a random sound variation for "B6".
 * To access a specific variation, simply use the index operator on the array
 */
class Callout extends Array
{
	constructor(id, column)
	{
		super();
		this.id = id;
		this.column = column;
	}

	// return a random Variation
	random()
	{
		return `voice_${this.column.announcer.name}_${this[Math.floor(Math.random() * this.length)]}`;
	}
}

/*
 * Column <- Map
 * A Column represents a letter in the word 'BINGO', with mappings to Callouts.
 * To access a callout: `<Callout>.get(Number)`
 */
class Column extends Map
{
	constructor(letter, voicepack)
	{
		super();
		this.letter = letter;
		this.id = letter;
		this.announcer = voicepack;
	}
}

/*
 * Voicepack <- Map
 * A Voicepack consists of the following structure:
 * Voicepack
 *   .[B|I|N|G|O] = <Column> => {id, <Callout>}
 *   .BINGO = <Callout>
 */
class Voicepack extends Map
{
	// define shorthands for the map columns
	get B()
	{
		return this.get("B");
	}
	get I()
	{
		return this.get("I");
	}
	get N()
	{
		return this.get("N");
	}
	get G()
	{
		return this.get("G");
	}
	get O()
	{
		return this.get("O");
	}
	get BINGO()
	{
		return this.get("BINGO");
	}

	// queues all the files for the voicepack to be loaded by Phaser
	preload(load)
	{
		const loadVariation = (variation) =>
		{
			const file = `voice_${this.name}_${variation}`;
			load.audio(file, `${this.name}/${variation}.mp3`);
		};

		// BINGO!!!
		for (const variation of this["BINGO"].values())
			loadVariation(variation);

		// <Voicepack>["B"] = <Column>
		for (let i = 0; i < BINGO.length; i++)
		{
			// <Column>[1] = <Callout>
			for (const callout of this[BINGO[i]].values())
			{
				// <Callout> == <Array>
				// variation will be 'voice_<announcer>.'
				for (const variation of callout)
					loadVariation(variation);
			}
		}
	}

	constructor(name = "deyan", numbersPerColumn = 15, variations = 3)
	{
		super();

		this.name = name;
		this.numbersPerColumn = numbersPerColumn;
		this.variations = variations;

		this.set("BINGO", new Callout(-1, new Column("BINGO", this)));
		for (let i = 0; i < variations; i++)
			this["BINGO"].push(`Bingo_${i.toString().padStart(2, "0")}`);

		for (let i = 0; i < BINGO.length; i++)
		{
			const col = BINGO[i];
			this.set(col, new Column(col, this));

			// start x at the callout number for each BINGO column (i.e. 16 for I)
			for (let x = (numbersPerColumn * i) + 1; x <= (numbersPerColumn * i) + numbersPerColumn; x++)
			{
				const callout = new Callout(x, this[col]);
				this[col].set(x, callout);

				for (let z = 0; z < variations; z++)
					// A filename has the structure of `[B|I|N|G|O]_##_##.mp3`
					callout.push(`${col}_${callout.id.toString().padStart(2, "0")}_${z.toString().padStart(2, "0")}`);
			}
		}
	}
}

export default Voicepack;
