import Scene from "../objects/Scene.js";
import Back from "../objects/Back.js";

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

	wake(data)
	{
		this.create(data);
	}

	create(data = {})
	{
		console.log("Entered Scene_Menu_Lobby");

		super.create(data);

		this.connection = this.game.connection;

		if (!Array.from(this.children).some(c => c instanceof Back))
			this.add.existing(new Back("Scene_Menu_Main", {
				scene: this,
				x: this.width * .1,
				y: this.height * .075,
				defaultButtonEvents: true
			}).setScale(.5));

		// TODO: Add "BEGIN GAME" Button, only accessible by match host

		this.connection.joinOrCreateMatch()
			.then(match =>
			{
				console.log(`Joined match { ${match.id} }`);

				console.log("Beginning game in 30 seconds...");
				setTimeout(() =>
				{
					match.send("match-host-begin");
				}, 1000 * 30);
			}).catch(console.error);
	}
}

export default Scene_Menu_Lobby;
