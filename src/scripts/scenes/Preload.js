import * as Phaser from "phaser";

class PreloadScene extends Phaser.Scene
{
	constructor()
	{
		super({ key: "PreloadScene" });
	}

	preload()
	{
		this.load.setPath("assets/img/");

		/* Card Assets */

		this.load.image("bg_ticket", "card/bg_ticket.png");
		for (let i = 1; i <= 5; i++)
			this.load.image(`bg_bingo${i}`, `card/bg_bingo${i}.png`);

		for (let i = 1; i <= 5; i++)
			this.load.image(`bg_numberTile${i}`, `card/bg_numberTile${i}.png`);

		/* Ball Assets */

		this.load.image("bg_ballContainer", "balls/bg_ballContainer.png");
		for (let i = 1; i <= 5; i++)
			this.load.image(`bg_ball${i}`, `balls/bg_ball${i}.png`);

		/* UI Assets */

		this.load.image("coin", "UI/coin.png");
		this.load.image("bg_score", "UI/bg_score.png");
		this.load.image("bg_scoreboard", "UI/bg_scoreboard.png");
	}

	create()
	{
		this.scene.start("MainScene");

		/**
		 * This is how you would dynamically import the mainScene class (with code splitting),
		 * add the mainScene to the Scene Manager
		 * and start the scene.
		 * The name of the chunk would be "mainScene.chunk.js
		 * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
		 */
		// let someCondition = true
		// if (someCondition)
		//   import(/* webpackChunkName: "mainScene" */ "./mainScene").then(mainScene => {
		//     this.scene.add("MainScene", mainScene.default, true)
		//   })
		// else console.log("The mainScene class will not even be loaded by the browser")
	}
}

export default PreloadScene;
