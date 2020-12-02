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

		// Logo
		this.load.image("bg_logo","Logo/logo.png");

		/* Card Assets */

		// Ticket Background
		this.load.image("bg_ticket", "card/bg_ticket.png");

		// BINGO Tiles
		for (let i = 1; i <= 5; i++)
			this.load.image(`bg_bingo${i}`, `card/bg_bingo${i}.png`);

		// Button Backgrounds
		for (let i = 1; i <= 5; i++)
			this.load.image(`bg_numberTile${i}`, `card/bg_numberTile${i}.png`);

		// Ball Queue
		this.load.image("bg_ballQueue", "balls/bg_ballQueue.png");
		for (let i = 1; i <= 5; i++)
			this.load.image(`bg_ball${i}`, `balls/bg_ball${i}.png`);

		/* UI Assets */

		// Game Elements
		this.load.image("coin", "UI/coin.png");
		this.load.image("bg_score", "UI/bg_scorebar.png");
		this.load.image("bg_scoreboard", "UI/bg_scoreboard.png");

		// Menu Buttons
		this.load.image("bg_play", "buttons/bg_buttonPlay.png");
		this.load.image("bg_leaderboard", "buttons/bg_buttonScoreboard.png");
		this.load.image("bg_settings", "buttons/bg_buttonSettings.png");
		this.load.image("bg_exit", "buttons/bg_buttonExit.png");
		this.load.image("bg_back", "buttons/bg_buttonBack.png");
		this.load.image("bg_multiplayer", "buttons/bg_buttonMultiplayer.png");
		this.load.image("bg_singleplayer", "buttons/bg_buttonSinglePlayer.png");
		this.load.image("bg_resume", "buttons/bg_buttonResume.png");
		this.load.image("bg_pause", "buttons/bg_buttonPause.png");

		// Wallpapers
		this.load.image("bg_wallpaper00","background/bg_background00.jpg");
		this.load.image("bg_wallpaper01","background/bg_background01.jpg");
		this.load.image("bg_wallpaper02","background/bg_background02.jpg");
		this.load.image("bg_wallpaper03","background/bg_background03.jpg");

		/* Animations */

		// Confetti
		this.load.spritesheet("confetti", "animations/spritesheet_confetti_01.png", {
			frameWidth: 512,
			endFrame: 59
		});
	}


	create()
	{
		this.scene.start("Scene_Menu_Main");
	}
}

export default Scene_Preload;
