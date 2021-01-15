import * as Phaser from "phaser";

import Scene from "../objects/Scene.js";
import SceneButton from "../objects/SceneButton.js";
import Leaderboard from "../objects/Leaderboard.js";
import Playerlist from "../objects/Playerlist.js";
import Player from "../classes/Player.js";
class Scene_Menu_Leaderboard extends Scene
{
	constructor()
	{
		super({
			key: "Scene_Menu_Leaderboard",
			wallpaper: true
		});
		this.anims = null;

	}
	create(data = {})
	{
		super.create(data);

		/* Settings Panel */
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.50, "panel_leaderboard")
			.setScale(1.3);

		this.make.text({
			x: this.width / 2.8,
			y: this.height / 4,
			text: "Name",
			style: {
				font: "30px monospace",
				fill: "#FFFFFF",
				align: "center"
			}
		}).setOrigin(.5);

		this.make.text({
			x: this.width / 1.6,
			y: this.height / 4,
			text: "Score",
			style: {
				font: "30px monospace",
				fill: "#FFFFFF",
				align: "center"
			}
		}).setOrigin(.5);

		/* Back Button */
		this.add.existing(new SceneButton("Scene_Menu_Main", {
			scene: this,
			x: this.width * .1,
			y: this.height * .075,
			defaultButtonEvents: true
		}).setScale(.5));

		//Panel
		const scrollablePanel = this.rexUI.add.scrollablePanel({
			x: this.width / 2,
			y: this.height / 1.65,
			width: this.width * .45,
			height: this.height * .6,

			scrollMode: 0,

			background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0x222d2e),//0x222d2e

			panel: {
				child: this.rexUI.add.fixWidthSizer({
					align: "center",
					anchor: "center",
					space: {
						left: 3,
						right: 3,
						top: 3,
						bottom: 4,
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
		//FIX: Needs to show the names and scores
		/*var updatePanel = () =>
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
		updatePanel();*/
	}

	update()
	{

	}
}

export default Scene_Menu_Leaderboard;
