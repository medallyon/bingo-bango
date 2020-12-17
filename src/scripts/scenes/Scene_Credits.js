import * as Phaser from "phaser";

import Scene from "../objects/Scene.js";

class Scene_Credits extends Scene
{
	constructor()
	{
		super({
			key: "Scene_Credits",
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

export default Scene_Credits;
