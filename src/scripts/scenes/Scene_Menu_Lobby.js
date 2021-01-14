import Scene from "../objects/Scene.js";
import SceneButton from "../objects/SceneButton.js";

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
		console.log("Scene_Menu_Lobby.create()");

		super.create(data);

		this.connection = this.game.connection;

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

		// TODO: Add "BEGIN GAME" Button, only accessible by match host

		this.connection.joinOrCreateMatch()
			.then(match =>
			{
				console.log(`Joined match { ${match.id} }`);

				console.log("Beginning game in 5 seconds...");
				this.time.delayedCall(1000 * 5, () =>
				{
					match.send("match-host-begin");
				});
			}).catch(console.error);
	}
}

export default Scene_Menu_Lobby;
