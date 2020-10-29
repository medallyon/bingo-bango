import * as Phaser from "phaser";
import "@babel/polyfill";

import ConnectionHandler from "./classes/ConnectionHandler.js";

import PreloadScene from "./scenes/Preload.js";
import MainScene from "./scenes/Main.js";

Array.prototype.first = function()
{
	return this[0];
};
Array.prototype.last = function()
{
	return this[this.length - 1];
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
Array.prototype.random = function()
{
	return this[Math.floor(Math.random() * this.length)];
};

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
