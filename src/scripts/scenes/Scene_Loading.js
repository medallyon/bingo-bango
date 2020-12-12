import * as Phaser from "phaser";

import Scene from "../objects/Scene.js";
class Scene_Loading extends Scene
{
	constructor()
	{
		super({
			key: "Scene_Loading",
			wallpaper: true
		});
	}

	create(data = {})
	{
		super.create(data);
		this.connection = this.game.connection;
		this.scene.start("Scene_Menu_Main");
	}
	update()
	{

	}
}
export default Scene_Loading;
