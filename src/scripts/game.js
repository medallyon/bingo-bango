import "phaser"
import "@babel/polyfill"

import MainScene from "./scenes/Main";
import PreloadScene from "./scenes/Preload";

class Bingo extends Phaser.Game
{
	constructor(anchor = "game-anchor")
	{
		super({
			type: Phaser.AUTO,
			backgroundColor: "#ffffff",
			scale: {
				parent: anchor.replace(/\#/g, ""),
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
	}
}

window.addEventListener("load", () =>
{
	const game = new Bingo("#phaser-game");
});
