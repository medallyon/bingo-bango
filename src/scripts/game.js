import * as Phaser from "phaser";
import "@babel/polyfill";
import * as Colyseus from "colyseus.js";

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

		this.host = window.location.origin.replace(/^https?/, "ws");
		this.client = new Colyseus.Client(this.host);

		this.client.joinOrCreate("test")
			.then(room =>
			{
				console.log(room.sessionId, "joined", room.name);
			}).catch(console.error);
	}
}

window.addEventListener("load", () =>
{
	const game = new Bingo("#phaser-game");
});
