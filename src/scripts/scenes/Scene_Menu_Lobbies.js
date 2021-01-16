import Scene from "../objects/Scene.js";
import SceneButton from "../objects/SceneButton.js";

class Scene_Menu_Lobbies extends Scene
{
	constructor()
	{
		super({
			key: "Scene_Menu_Lobbies",
			wallpaper: true
		});

		this.connection = null;
		this.players = [];

		this.buttons = {
			join_lobby: null,
			create_lobby:null
		};
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
			defaultButtonEvents: true
		}).setScale(.5));

		/* Lobbies Panel */
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.40, "panel_lobbies")
			.setScale(1);

		// Lobby
		this.add.text({
			x: this.width / 2.7,
			y: this.height / 5,
			text: "Lobby",
			style: {
				font: "25px monospace",
				fill: "#FFFFFF",
				align: "center"
			}
		}).setOrigin(.5);

		// Players
		this.add.text({
			x: this.width / 2,
			y: this.height / 5,
			text: "Players",
			style: {
				font: "25px monospace",
				fill: "#FFFFFF",
				align: "center"
			}
		}).setOrigin(.5);

		// Status
		this.add.text({
			x: this.width / 1.6,
			y: this.height / 5,
			text: "Status",
			style: {
				font: "25px monospace",
				fill: "#FFFFFF",
				align: "center"
			}
		}).setOrigin(.5);

		// Scrollable Panel
		const scrollablePanel = this.rexUI.add.scrollablePanel({
			x: this.width / 2,
			y: this.height / 2.1,
			width: this.width * .33,
			height: this.height * .48,

			scrollMode: 0,

			background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0x222d2e),

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

		// [Button] Join Lobby
		this.add.existing(new SceneButton("Scene_Menu_Lobby", {
			scene: this,
			x: this.width * .4,
			y: this.height * .8,
			defaultButtonEvents: true,
			texture: "button_join_lobby"
		}).setScale(.5));

		// [Button] Create Lobby
		this.add.existing(new SceneButton("Scene_Menu_Lobby", {
			scene: this,
			x: this.width * .6,
			y: this.height * .8,
			defaultButtonEvents: true,
			texture: "button_create_lobby"
		}).setScale(.5));
	}
}

export default Scene_Menu_Lobbies;
