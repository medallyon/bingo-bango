import * as Phaser from "phaser";

import * as objects from "../objects/objects.js";
import Voicepack from "../classes/Voicepack.js";

class Scene_Preload extends Phaser.Scene
{
	static importImageSeries(load, prefix, amount, ext, start = 0, pad = 2)
	{
		for (let i = 0; i < amount; i++)
		{
			const key = prefix + (i + start).toString().padStart(pad, "0");
			load.image(key, `${key}.${ext}`);
		}
	}

	_composeLoadingScreen()
	{
		const width = this.cameras.main.width
			, height = this.cameras.main.height
			, bar = {
				x: width / 2 - (width / 3 * .5),
				y: height / 2 - (50 * .5),
				width: width / 3,
				height: 50
			};

		this.add.image(width / 2, height / 2, "wallpaper_loading")
			.setScale(0.7111);

		// actual loading progress bar
		const progressBar = this.add.graphics();
		// bar background
		this.add.graphics()
			.fillStyle(0x000000, 0.8)
			.fillRect(bar.x, bar.y, bar.width, bar.height);

		// "Loading..."
		this.add.text({
			x: width / 2,
			y: height / 2,
			text: "Loading...",
			style:
			{
				font: "20px monospace",
				fill: "#000000",
				align: "center"
			}
		}).setOrigin(.5);

		// "[x] %"
		const percentText = this.make.text({
			x: width / 2,
			y: height / 2,
			text: "0%",
			style: {
				font: "18px monospace",
				fill: "#00FF00",
				align: "center"
			}
		}).setOrigin(.5);
		this.load.on("progress", (value) =>
		{
			percentText.setText((value * 100).toFixed() + "%");
			progressBar
				.fillStyle(0x000000, 1)
				// TODO: Figure out exact maths to center rect-bar
				.fillRect(bar.x * 1.05, bar.y * 1.035, bar.width * .9 * value, bar.height * .6);
		});
	}

	constructor()
	{
		super({
			key: "Scene_Preload",
			pack: {
				// pre-packing assets needed before the preload event (loading screen)
				files: [
					{ type: "image", key: "wallpaper_loading", url: "/assets/img/wallpapers/bg_wallpaper_00.jpg" }
				]
			}
		});
	}

	preload()
	{
		this._composeLoadingScreen();

		for (const Class of Object.values(objects))
		{
			if (Class.preload != null)
				Class.preload(this.load);
		}

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

		/* AUDIO */
		this.load.setPath("/assets/audio/");
		this.load.audio("audio_button_01", "buttons/button_01.wav");
		this.load.audio("audio_button_02", "buttons/button_02.wav");
		this.load.audio("audio_music_bg_01", "music/bg_01.mp3");
		this.load.audio("audio_music_bg_02", "music/bg_02.mp3");


		// Voicepacks
		this.load.setPath("/assets/audio/voice-packs/");
		(new Voicepack("deyan")).preload(this.load);
	}

	create()
	{
		this.scene.start("Scene_Menu_Main");
	}
}

export default Scene_Preload;
