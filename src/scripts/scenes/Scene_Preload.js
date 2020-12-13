import * as Phaser from "phaser";

import { BINGO } from "../globals.js";
import Voicepack from "../classes/Voicepack.js";

import * as objects from "../objects/objects.js";

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
		/* ========================
		 * ====== ANIMATIONS ======
		 * ======================== */
		this.load.setPath("assets/img/animations");

		// Confetti
		this.load.spritesheet("confetti", "spritesheet_confetti_01.png", {
			frameWidth: 512,
			endFrame: 59
		});

		for (const Class of Object.values(objects))
		{
			if (Class.preload != null)
				Class.preload(this.load);
		}

		/* ====================
		 * ====== IMAGES ======
		 * ==================== */
		this.load.setPath("assets/img/");

		// Logo
		this.load.image("logo", "logo.png");

		/* UI Assets */

		// Game Elements
		this.load.image("coin", "UI/icons/coin.png");
		this.load.image("heart", "UI/icons/heart.png");
		this.load.image("star", "UI/icons/star.png");

		this.load.image("bg_score", "UI/bg_score.png");

		// Panels
		this.load.image("panel_customLobby", "UI/panels/bg_panel_customLobby.png");
		this.load.image("panel_customLobby_split", "UI/panels/bg_panel_customLobby_split.png");
		this.load.image("panel_leaderboard", "UI/panels/bg_panel_leaderboard.png");
		this.load.image("panel_lobbies", "UI/panels/bg_panel_lobbies.png");
		this.load.image("panel_lobbies_split", "UI/panels/bg_panel_lobbies_split.png");
		this.load.image("panel_lobby", "UI/panels/bg_panel_lobby.png");
		this.load.image("panel_lobby_split", "UI/panels/bg_panel_lobby_split.png");
		this.load.image("panel_lobby_alt", "UI/panels/bg_panel_lobby_alt.png");
		this.load.image("panel_scoreboard", "UI/panels/bg_panel_scoreboard.png");
		this.load.image("panel_scores", "UI/panels/bg_panel_scores.png");
		this.load.image("panel_settings", "UI/panels/bg_panel_settings01.png");

		// Progress Bars
		this.load.image("progress", "UI/progress/bg_progress.png");
		this.load.image("progress_blue", "UI/progress/bg_progress_blue.png");
		this.load.image("progress_green", "UI/progress/bg_progress_green.png");
		this.load.image("progress_orange", "UI/progress/bg_progress_orange.png");
		this.load.image("progress_purple", "UI/progress/bg_progress_purple.png");
		this.load.image("progress_red", "UI/progress/bg_progress_red.png");

		// Wallpapers
		this.load.setPath("/assets/img/wallpapers");
		this._importImageSeries("bg_wallpaper_", 5, "jpg", 0, 2); // bg_wallpaper_00, ...

		/* AUDIO */
		this.load.setPath("/assets/audio");
		this.load.audio("audio_button01", "buttons/button01.wav");
		this.load.audio("audio_button01", "buttons/button01.wav");
		this.load.audio("audio_music01", "music/audio_music01.wav");

		// Voicepacks
		this.load.setPath("/assets/audio/voice-packs/");
		(new Voicepack("deyan")).preload(this.load);
	}

	create()
	{
		this.scene.start("Scene_Loading");
	}
}

export default Scene_Preload;
