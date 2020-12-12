import * as Phaser from "phaser";

import Scene from "../objects/Scene.js";

class Scene_Menu_CreateLobby extends Scene
{
	constructor()
	{
		super({
			key: "Scene_Menu_CreateLobby",
			wallpaper: true
		});
	}

	create(data = {})
	{
		super.create(data);
	}
}

export default Scene_Menu_CreateLobby;
