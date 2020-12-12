import * as Phaser from "phaser";

import Scene from "../objects/Scene.js";

class Scene_Menu_Credits extends Scene
{
	constructor()
	{
		super({
			key: "Scene_Menu_Credits",
			wallpaper: true
		});
	}

	create(data = {})
	{
		super.create(data);
	}

	update()
	{

	}
}

export default Scene_Menu_Credits;
