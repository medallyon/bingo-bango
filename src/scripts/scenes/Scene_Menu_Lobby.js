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

		this.settings = {
			cards: null,
			interval: null
		};
	}

	_createSettings()
	{
		const X_CARDS = this.width * .4, Y_CARDS = this.height * .4;
		this.add.text(X_CARDS, Y_CARDS - (this.height * .05), "Cards", {
			fontSize: 28,
			fontStyle: "bold",
			align: "center"
		}).setOrigin(.5);
		this.settings.cards = this.add.text(X_CARDS, Y_CARDS, "2", {
			fontSize: 32,
			align: "center"
		});
		this.settings.cards.setStroke("#000", 4)
			.setOrigin(.5);

		const X_INTERVAL = this.width * .4, Y_INTERVAL = this.height * .6;
		this.add.text(X_INTERVAL, Y_INTERVAL - (this.height * .05), "Ball Interval", {
			fontSize: 28,
			fontStyle: "bold",
			align: "center"
		}).setOrigin(.5);
		this.settings.interval = this.add.text(X_INTERVAL, Y_INTERVAL, "7.5", {
			fontSize: 32,
			align: "center"
		});
		this.settings.interval.setStroke("#000", 4)
			.setOrigin(.5);
	}

	create(data = {})
	{
		super.create(data);

		this.connection = this.game.connection;

		/* Lobbies Panel Background */
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.40, "panel_customLobby_split03")
			.setScale(1);

		// [Button] Back
		this.add.existing(new SceneButton("Scene_Menu_Lobbies", {
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

		this._createSettings();

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
			x: this.width * .61,
			y: this.height * .47,
			width: this.width * .2,
			height: this.height * .45,

			scrollMode: 0,

			background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0x222d2e),//0x222d2e

			panel: {
				child: this.rexUI.add.fixWidthSizer({
					align: "center",
					anchor: "center",
					space: {
						left: 5,
						right: 5,
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
					x: this.width / 1.6,
					y: this.height / 5,
					align: "center",
					fontSize: 28,
					fontStyle: "bold"
				});
				item.setOrigin(.5)
					.setStroke("#000", 5);

				sizer.add(item);
			}

			scrollablePanel.layout();
			return scrollablePanel;
		};

		// [Button] Begin Game
		let btnBegin = new Button({
			scene: this,
			x: this.width * .5,
			y: this.height * .85,
			texture: "button_start_game"
		}).setScale(.5);
		btnBegin.bg.setTint(0X777777);
		this.add.existing(btnBegin);

		this.connection.joinOrCreateMatch()
			.then(match =>
			{
				console.log(`Joined match { ${match.id} }`);

				// activate the 'begin game' button if this player becomes host
				match.state.listen("host", hostID =>
				{
					if (hostID !== match.sessionId)
						return;

					// replace old button with a new, interactive button
					btnBegin.destroy();
					btnBegin = new Button({
						scene: this,
						x: this.width * .5,
						y: this.height * .85,
						texture: "button_start_game",
						defaultButtonEvents: true,
						on: {
							pointerup: () =>
							{
								this.connection.beginMatch();
							}
						}
					}).setScale(.5);
					this.add.existing(btnBegin);

					{ // Only show buttons if client is host
						const X_CARDS = this.width * .4, Y_CARDS = this.height * .4
							, X_INTERVAL = this.width * .4, Y_INTERVAL = this.height * .6;

						// Decrease Card value
						new Button({
							scene: this,
							x: X_CARDS - (this.width * .02), y: Y_CARDS,
							texture: "dropdown_arrow_white",
							defaultButtonEvents: true,
							on: {
								pointerup: () =>
								{
									this.connection.match.send("match-settings-cards", {
										cards: Math.max(1, Math.min(4, parseInt(this.settings.cards.text) - 1))
									});
								}
							}
						}).setRotation(Math.PI * .5)
							.setScale(.5);

						// Increase Card value
						new Button({
							scene: this,
							x: X_CARDS + (this.width * .02), y: Y_CARDS,
							texture: "dropdown_arrow_white",
							defaultButtonEvents: true,
							on: {
								pointerup: () =>
								{
									this.connection.match.send("match-settings-cards", {
										cards: Math.max(1, Math.min(4, parseInt(this.settings.cards.text) + 1))
									});
								}
							}
						}).setRotation(Math.PI * 1.5)
							.setScale(.5);

						// Decrease Interval value
						new Button({
							scene: this,
							x: X_INTERVAL - (this.width * .03), y: Y_INTERVAL,
							texture: "dropdown_arrow_white",
							defaultButtonEvents: true,
							on: {
								pointerup: () =>
								{
									this.connection.match.send("match-settings-interval", {
										interval: Math.max(1, Math.min(15, parseFloat(this.settings.interval.text) - .5))
									});
								}
							}
						}).setRotation(Math.PI * .5)
							.setScale(.5);

						// Increase Interval value
						new Button({
							scene: this,
							x: X_INTERVAL + (this.width * .03), y: Y_INTERVAL,
							texture: "dropdown_arrow_white",
							defaultButtonEvents: true,
							on: {
								pointerup: () =>
								{
									this.connection.match.send("match-settings-interval", {
										interval: Math.max(1, Math.min(15, parseFloat(this.settings.interval.text) + .5))
									});
								}
							}
						}).setRotation(Math.PI * 1.5)
							.setScale(.5);
					}
				});

				match.state.listen("cards", cards =>
				{
					this.settings.cards.setText(cards.toString());
				});
				match.state.listen("interval", interval =>
				{
					this.settings.interval.setText(interval.toString());
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
					if (this.players.indexOf(msg.userData.tag) === -1)
						return;

					this.players.splice(this.players.indexOf(msg.userData.tag), 1);
					updatePanel();
				});
			}).catch(console.error);
	}
}

export default Scene_Menu_Lobby;
