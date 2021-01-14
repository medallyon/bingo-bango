import "@babel/polyfill";
import * as Phaser from "phaser";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";

import SettingsManager from "./classes/SettingsManager.js";
import AudioManager from "./classes/AudioManager.js";
import ConnectionHandler from "./classes/ConnectionHandler.js";
import Voicepack from "./classes/Voicepack.js";

import Scene_Preload from "./scenes/Scene_Preload.js";
import Scene_Menu_Main from "./scenes/Scene_Menu_Main.js";
import Scene_Menu_Settings from "./scenes/Scene_Menu_Settings.js";
import Scene_Menu_Leaderboard from "./scenes/Scene_Menu_Leaderboard.js";
import Scene_Menu_Credits from "./scenes/Scene_Menu_Credits.js";
import Scene_Menu_Lobby from "./scenes/Scene_Menu_Lobby.js";
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
				Scene_Menu_Settings,
				Scene_Menu_Leaderboard,
				Scene_Menu_Credits,
				Scene_Menu_Lobby,
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

		this.xp = 0;
		this.score = 0;

		this.announcer = new Voicepack();
		this.connection = new ConnectionHandler(this);

		this.user = JSON.parse((name => // https://stackoverflow.com/a/15724300/4672263
		{
			const value = `; ${document.cookie}`;
			const parts = value.split(`; ${name}=`);
			if (parts.length === 2)
				return parts.pop().split(";").shift();
		})("user"));

		console.log(`Hello there, ${this.user.username}#${this.user.tag}`);
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
