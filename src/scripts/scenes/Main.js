import * as Phaser from "phaser";

import CardHolder from "../objects/CardHolder.js";

class MainScene extends Phaser.Scene
{
	constructor()
	{
		super({ key: "MainScene" });

		this.cards = null;
	}

	create(data = {})
	{
		const spawnCards = data.cards || 2;
		this.cards = new CardHolder(spawnCards, this, this.cameras.main.width * .5, this.cameras.main.height * (spawnCards < 3 ? .25 : .12));
		this.add.existing(this.cards);
	}

	update()
	{

	}
}

export default MainScene;
