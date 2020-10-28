class PreloadScene extends Phaser.Scene
{
	constructor()
	{
		super({ key: "PreloadScene" });
	}

	preload()
	{
		this.load.setPath("assets/img/");

		// Card Assets

		this.load.image("card/bg_ticket");
		for (let i = 1; i <= 5; i++)
			this.load.image(`card/bg_bingo${i}`);

		for (let i = 1; i <= 5; i++)
			this.load.image(`card/bg_numberTile${i}`);

		// Ball Assets

		this.load.image("balls/bg_ballContainer");
		for (let i = 1; i <= 5; i++)
			this.load.image(`balls/bg_ball${i}`);
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
