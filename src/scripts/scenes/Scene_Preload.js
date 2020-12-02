import * as Phaser from "phaser";

import { BINGO } from "../globals.js";

class Scene_Preload extends Phaser.Scene
{
	_importImageSeries(prefix, amount, ext, start = 0, pad = 2)
	{
		for (let i = 0; i < amount; i++)
		{
			const key = prefix + (i + start).toString().padStart(pad);
			this.load.image(key, key + ext);
		}
	}

	constructor()
	{
		super({ key: "Scene_Preload" });
	}

	preload()
	{
		/* =====================
		 * ====== PLUGINS ======
		 * ===================== */
		this.load.setPath("assets/plugin");

		// Rex's Slider Plugin
		// https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsliderplugin.min.js
		this.load.plugin("slider", "plugin/slider.js", true);

		/* ========================
		 * ====== ANIMATIONS ======
		 * ======================== */
		this.load.setPath("assets/img/animations");

		// Confetti
		this.load.spritesheet("confetti", "animations/spritesheet_confetti_01.png", {
			frameWidth: 512,
			endFrame: 59
		});

		/* ====================
		 * ====== IMAGES ======
		 * ==================== */
		this.load.setPath("assets/img/");

		// Logo
		this.load.image("bg_logo", "logo.png");

		/* Card Assets */

		// Ticket Background
		this.load.image("bg_ticket", "card/bg_ticket.png");

		// BINGO Tiles
		for (let i = 1; i <= 5; i++)
			this.load.image(`tile_${BINGO[i]}`, `card/tile_${BINGO[i]}.png`);

		// Button Tile Backgrounds
		for (let i = 1; i <= 5; i++)
			this.load.image(`bg_tile_${BINGO[i]}`, `card/bg_tile${BINGO[i]}.png`);

		// Ball Queue
		this.load.image("bg_ballQueue", "balls/bg_ballQueue.png");
		for (let i = 1; i <= 5; i++)
			this.load.image(`ball_${BINGO[i]}`, `card/ball_${BINGO[i]}.png`);

		/* UI Assets */

		// Game Elements
		this.load.image("coin", "UI/icons/coin.png");
		this.load.image("heart", "UI/icons/heart.png");
		this.load.image("star", "UI/icons/star.png");

		this.load.image("bg_score", "UI/bg_score.png");
		this.load.image("bg_scoreboard", "UI/bg_scoreboard_02.png");

		// Menu Buttons
		this.load.image("button_back", "buttons/button_back.png");
		this.load.image("button_exit", "buttons/button_exit.png");
		this.load.image("button_icon_resume", "buttons/button_icon_resume.png");
		this.load.image("button_leaderboard", "buttons/button_leaderboard.png");
		this.load.image("button_pause", "buttons/button_pause.png");
		this.load.image("button_play", "buttons/button_play.png");
		this.load.image("button_resume", "buttons/button_resume.png");
		this.load.image("button_settings", "buttons/button_settings.png");

		// Wallpapers
		this._importImageSeries("bg_wallpaper_", 4, "jpg", 2); // bg_wallpaper_00, ...
	}


	create()
	{
		this.scene.start("Scene_Menu_Main");
	}
}

export default Scene_Preload;
