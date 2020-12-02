import * as Phaser from "phaser";

import { BINGO } from "../globals.js";

class Scene_Preload extends Phaser.Scene
{
	_importImageSeries(prefix, amount, ext, start = 0, pad = 2)
	{
		for (let i = 0; i < amount; i++)
		{
			const key = prefix + (i + start).toString().padStart(pad, "0");
			this.load.image(key, `${key}.${ext}`);
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
		this.load.plugin("slider", "slider.js", true);

		/* ========================
		 * ====== ANIMATIONS ======
		 * ======================== */
		this.load.setPath("assets/img/animations");

		// Confetti
		this.load.spritesheet("confetti", "spritesheet_confetti_01.png", {
			frameWidth: 512,
			endFrame: 59
		});

		/* ====================
		 * ====== IMAGES ======
		 * ==================== */
		this.load.setPath("assets/img/");

		// Logo
		this.load.image("logo", "logo.png");

		/* Card Assets */

		// BINGO Tiles
		for (let i = 0; i < 5; i++)
			this.load.image(`tile_${BINGO[i]}`, `card/tile_${BINGO[i]}.png`);

		// Button Tile Backgrounds
		for (let i = 0; i < 5; i++)
			this.load.image(`bg_tile_${BINGO[i]}`, `card/bg_tile_${BINGO[i]}.png`);

		// Ball Queue
		this.load.image("bg_ballQueue", "balls/bg_ballQueue.png");
		for (let i = 0; i < 5; i++)
			this.load.image(`ball_${BINGO[i]}`, `balls/ball_${BINGO[i]}.png`);

		/* UI Assets */

		// Game Elements
		this.load.image("coin", "UI/icons/coin.png");
		this.load.image("heart", "UI/icons/heart.png");
		this.load.image("star", "UI/icons/star.png");

		this.load.image("bg_score", "UI/bg_score.png");

		// Panels
		this.load.image("bg_panel_customLobby", "UI/panels/bg_panel_customLobby.png");
		this.load.image("bg_panel_customLobby_split", "UI/panels/bg_panel_customLobby_split.png");
		this.load.image("bg_panel_leaderboard", "UI/panels/bg_panel_leaderboard.png");
		this.load.image("bg_panel_lobbies", "UI/panels/bg_panel_lobbies.png");
		this.load.image("bg_panel_lobbies_split", "UI/panels/bg_panel_lobbies_split.png");
		this.load.image("bg_panel_lobby", "UI/panels/bg_panel_lobby.png");
		this.load.image("bg_panel_lobby_split", "UI/panels/bg_panel_lobby_split.png");
		this.load.image("bg_panel_lobby_alt", "UI/panels/bg_panel_lobby_alt.png");
		this.load.image("bg_panel_scoreboard", "UI/panels/bg_panel_scoreboard.png");
		this.load.image("bg_panel_scores", "UI/panels/bg_panel_scores.png");
		this.load.image("bg_panel_settings", "UI/panels/bg_panel_settings.png");

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
		this.load.setPath("/assets/img/wallpapers");
		this._importImageSeries("bg_wallpaper_", 4, "jpg", 0, 2); // bg_wallpaper_00, ...
	}


	create()
	{
		this.scene.start("Scene_Menu_Main");
	}
}

export default Scene_Preload;
