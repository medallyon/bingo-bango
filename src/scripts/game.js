import * as Phaser from "phaser";
import "@babel/polyfill";

import ConnectionHandler from "./classes/ConnectionHandler.js";

import PreloadScene from "./scenes/Preload";
import MainScene from "./scenes/Main";

class Bingo extends Phaser.Game
{
	constructor(anchor = "game-anchor")
	{
		super({
			type: Phaser.AUTO,
			backgroundColor: "#ffffff",
			scale: {
				parent: anchor.replace(/^#/, ""),
				mode: Phaser.Scale.FIT,
				autoCenter: Phaser.Scale.CENTER_BOTH,
				width: 1280,
				height: 720
			},
			scene: [ PreloadScene, MainScene ],
			physics: {
				default: "arcade",
				arcade: {
					debug: false,
					gravity: {}
				}
			}
		});

		this.connection = new ConnectionHandler(this);
	}
}

window.addEventListener("load", () =>
{
	new Bingo("#phaser-game");
});
