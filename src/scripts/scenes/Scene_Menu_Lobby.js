import Scene from "../objects/Scene.js";
import SceneButton from "../objects/SceneButton.js";
import Button from "../objects/buttons/Button.js";
import TextOverlay from "../objects/buttons/overlays/TextOverlay.js";

class Scene_Menu_Lobby extends Scene
{
	constructor()
	{
		super({
			key: "Scene_Menu_Lobby",
			wallpaper: true
		});

		this.connection = null;
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

		// [Button] Begin Game
		let btnBegin = new Button({
			scene: this,
			x: this.width * .5,
			y: this.height * .65,
			texture: "button_play"
		});
		btnBegin.bg.setTint(0X777777);
		this.add.existing(btnBegin);

		this.connection.joinOrCreateMatch()
			.then(match =>
			{
				console.log(`Joined match { ${match.id} }`);

				match.state.listen("host", (hostID, oldHostID) =>
				{
					console.log("match.state.listen.host", hostID);
					if (hostID === oldHostID)
						return;

					btnBegin.destroy();
					btnBegin = new Button({
						scene: this,
						x: this.width * .5,
						y: this.height * .65,
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
			}).catch(console.error);
	}
}

export default Scene_Menu_Lobby;
