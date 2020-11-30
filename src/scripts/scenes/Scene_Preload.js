import * as Phaser from "phaser";

class Scene_Preload extends Phaser.Scene
{
	constructor()
	{
		super({ key: "Scene_Preload" });
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
		this.load.image("bg_score", "UI/bg_scorebar.png");
		this.load.image("bg_scoreboard", "UI/bg_scoreboard.png");

		/* Menu Buttons */
		this.load.image("bg_play", "buttons/bg_buttonPlay.png");
		this.load.image("bg_leaderboard", "buttons/bg_buttonScoreboard.png");
		this.load.image("bg_settings", "buttons/bg_buttonSettings.png");
		this.load.image("bg_exit", "buttons/bg_buttonExit.png");
		this.load.image("bg_back", "buttons/bg_buttonBack.png");
		this.load.image("bg_multiplayer", "buttons/bg_buttonMultiplayer.png");
		this.load.image("bg_singleplayer", "buttons/bg_buttonSinglePlayer.png");
		this.load.image("bg_resume", "buttons/bg_buttonResume.png");
		this.load.image("bg_pause", "buttons/bg_buttonPause.png");

		/* Wallpaper */
		this.load.image("bg_wallpaper00","background/bg_background00.jpg");
		this.load.image("bg_wallpaper01","background/bg_background01.jpg");
		this.load.image("bg_wallpaper02","background/bg_background02.jpg");
		this.load.image("bg_wallpaper03","background/bg_background03.jpg");

		/* Logo */
		this.load.image("bg_logo","Logo/logo.png");

		/* Animations */
		this.load.video("confetti","animations/confetti.gif");
	}


	create()
	{
		this.scene.start("Scene_Menu_Main");

		/**
		 * This is how you would dynamically import the mainScene class (with code splitting),
		 * add the mainScene to the Scene Manager
		 * and start the scene.
		 * The name of the chunk would be "mainScene.chunk.js
		 * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
		 */
		//let someCondition = true
		// if (someCondition)
		//   import(/* webpackChunkName: "mainScene" */ "./mainScene").then(mainScene => {
		//     this.scene.add("MainScene", mainScene.default, true)
		//   })
		// else console.log("The mainScene class will not even be loaded by the browser")
	}
}

export default Scene_Preload;
