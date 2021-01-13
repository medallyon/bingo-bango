import "@babel/polyfill";
import * as Phaser from "phaser";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";

import SettingsManager from "./classes/SettingsManager.js";
import AudioManager from "./classes/AudioManager.js";
import ConnectionHandler from "./classes/ConnectionHandler.js";
import Voicepack from "./classes/Voicepack.js";

import Scene_Preload from "./scenes/Scene_Preload.js";
import Scene_Menu_Main from "./scenes/Scene_Menu_Main.js";
import Scene_Settings from "./scenes/Scene_Settings.js";
import Scene_Leaderboard from "./scenes/Scene_Leaderboard.js";
import Scene_Credits from "./scenes/Scene_Credits.js";
import Scene_Match from "./scenes/Scene_Match.js";

Array.prototype.contains = function(item)
{
	return this.includes(item);
};
Array.prototype.first = function()
{
	return this[0];
};
Array.prototype.last = function()
{
	return this[this.length - 1];
};
Array.prototype.random = function()
{
	return this[Math.floor(Math.random() * this.length)];
};
Array.prototype.shuffle = function()
{
	// https://stackoverflow.com/a/12646864
	for (let i = this.length - 1; i > 0; i--)
	{
		const j = Math.floor(Math.random() * (i + 1));
		[this[i], this[j]] = [this[j], this[i]];
	}

	return this;
};

class Bingo extends Phaser.Game
{
	constructor(anchor = "game-anchor")
	{
		super({
			type: Phaser.AUTO,
			backgroundColor: "#ffffff",
			audio: {
				disableWebAudio: true
			},
			scale: {
				parent: anchor.replace(/^#/, ""),
				mode: Phaser.Scale.FIT,
				autoCenter: Phaser.Scale.CENTER_BOTH,
				width: 1280,
				height: 720
			},
			scene: [
				Scene_Preload,
				Scene_Menu_Main,
				Scene_Settings,
				Scene_Leaderboard,
				Scene_Credits,
				Scene_Match
			],
			physics: {
				default: "arcade",
				arcade: {
					debug: false,
					gravity: {}
				}
			},
			callbacks: {
				preBoot: (game) =>
				{
					game.settings = new SettingsManager();
					game.audio = new AudioManager(game, [ "music", "voice", "effects" ]);
				}
			},
			plugins: {
				scene: [{
					key: "rexUI",
					plugin: RexUIPlugin,
					mapping: "rexUI"
				}]
			}
		});

		this.score = 0;
		this.xp = 0;

		this.announcer = new Voicepack();
		this.connection = new ConnectionHandler(this);
	}
}

window.addEventListener("load", () =>
{
	new Bingo("#phaser-game");

	// Disable the RMB context menu in the game
	/*document.getElementById("phaser-game").oncontextmenu = function(e)
	{
		e.preventDefault();
		e.stopPropagation();
	};*/
});
