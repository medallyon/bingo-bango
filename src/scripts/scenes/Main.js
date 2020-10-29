import * as Phaser from "phaser";

import Card from "../objects/Card.js";

class MainScene extends Phaser.Scene
{
	constructor()
	{
		super({ key: "MainScene" });

		this.cards = null;
	}

	create()
	{
		this.cards = new Phaser.GameObjects.Container(this);
		this.add.existing(this.cards);

		this.cards.add(new Card(this, this.cameras.main.width * .33, this.cameras.main.height / 2));
		this.cards.add(new Card(this, this.cameras.main.width * .66, this.cameras.main.height / 2));

		this.cards.setScale(.5);
	}

	update()
	{

	}
}

export default MainScene;
