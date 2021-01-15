import * as Phaser from "phaser";

import Scene from "../objects/Scene.js";
import SceneButton from "../objects/SceneButton.js";
import Button from "../objects/buttons/Button.js";
import Playerlist from "../objects/Playerlist.js";
import Player from "../classes/Player.js";

class Scene_Menu_Lobby extends Scene
{
	constructor()
	{
		super({
			key: "Scene_Menu_Lobby",
			wallpaper: true
		});

		this.connection = null;
		this.players = [];
	}

	create(data = {})
	{
		super.create(data);

		this.connection = this.game.connection;

		// [Button] Back
		this.add.existing(new SceneButton("Scene_Menu_Main", {
			scene: this,
			x: this.width * .1,
			y: this.height * .075,
			userDecision: "Are you sure you want to leave the lobby and return to the menu?",
			defaultButtonEvents: true,
			clickCallback: () =>
			{
				this.connection.leaveMatch();
			}
		}).setScale(.5));

		// [Playerlist]
		/*const playerlist = new Playerlist({
			scene: this,
			x: this.width / 2, y: this.height / 2,
			panel: {
				width: this.height * .5,
				height: this.height * .75,
			}
		});*/

		const scrollablePanel = this.rexUI.add.scrollablePanel({
			x: this.width / 2,
			y: this.height / 2.5,
			width: this.width * .25,
			height: this.height * .5,

			scrollMode: 0,

			background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0x355387),

			panel: {
				child: this.rexUI.add.fixWidthSizer({
					align: "center",
					anchor: "center",
					space: {
						left: 3,
						right: 3,
						top: 3,
						bottom: 3,
						item: 8,
						line: 8,
					}
				}),

				mask: {
					padding: 1
				},
			},

			space: {
				left: 10,
				right: 10,
				top: 10,
				bottom: 10,

				panel: 10,
			}
		}).layout();

		var updatePanel = () =>
		{
			const sizer = scrollablePanel.getElement("panel");

			sizer.clear(true);
			for (var i = 0; i < this.players.length; i++)
			{
				const item = this.add.text(0, 0, this.players[i], {
					align: "center",
					fontSize: 32,
					fontStyle: "bold"
				});
				item.setOrigin(.5)
					.setStroke("#000", 5);

				sizer.add(item);
			}

			scrollablePanel.layout();
			return scrollablePanel;
		};
		updatePanel();

		// [Button] Begin Game
		let btnBegin = new Button({
			scene: this,
			x: this.width * .5,
			y: this.height * .8,
			texture: "button_play"
		});
		btnBegin.bg.setTint(0X777777);
		this.add.existing(btnBegin);

		this.connection.joinOrCreateMatch()
			.then(match =>
			{
				console.log(`Joined match { ${match.id} }`);

				// activate the 'begin game' button if this player becomes host
				match.state.listen("host", (hostID, oldHostID) =>
				{
					if (hostID === oldHostID)
						return;

					// replace old button with a new, interactive button
					btnBegin.destroy();
					btnBegin = new Button({
						scene: this,
						x: this.width * .5,
						y: this.height * .8,
						texture: "button_play",
						defaultButtonEvents: true,
						on: {
							pointerup: () =>
							{
								this.connection.beginMatch();
							}
						}
					});
					this.add.existing(btnBegin);
				});

				// event just for this client, triggers on first join
				// to fetch all pre-connected players
				match.onMessage("match-clients", msg =>
				{
					this.players = msg.players.map(x => x.tag);
					updatePanel();
				});

				// triggered whenever a player joins
				match.onMessage("match-player-join", msg =>
				{
					if (msg.userData.id === this.connection.player.id)
						return;

					this.players.push(msg.userData.tag);
					updatePanel();
				});

				// triggered whenever a player leaves
				match.onMessage("match-player-leave", msg =>
				{
					if (this.players.indexOf(msg.userData.tag) !== -1)
						this.players.splice(this.players.indexOf(msg.userData.tag), 1);
					updatePanel();
				});
			}).catch(console.error);
	}
}

export default Scene_Menu_Lobby;
