import * as Phaser from "phaser";

import Scene from "../objects/Scene.js";
import Back from "../objects/Back.js";
import Leaderboard from "../objects/Leaderboard.js";


class Scene_Leaderboard extends Scene
{
	constructor()
	{
		super({
			key: "Scene_Leaderboard",
			wallpaper: true
		});
	}

	create(data = {})
	{
		super.create(data);

		/* Settings Panel Background */
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
		this.add.existing(new Back("Scene_Menu_Main", {
			scene: this,
			x: this.width * .1,
			y: this.height * .075,
			defaultButtonEvents: true
		}).setScale(.5));
		//TESTING ANIMATION
		this.confetti = this.add.sprite(200,200,"confetti");
		var frameNames = this.textures.get("confetti").getFrameNames();
		console.log(frameNames);
		this.anims.create({
			key:"Celebrate",
			frames:
			[
				{key:"confetti", frame: "0"},
				{key:"confetti", frame: "1"},
				{key:"confetti", frame: "2"},
				{key:"confetti", frame: "3"},
				{key:"confetti", frame: "4"},
				{key:"confetti", frame: "5"},
				{key:"confetti",frame: "6"},
				{key:"confetti",frame: "7"},
				{key:"confetti",frame: "8"},
				{key:"confetti",frame: "9"},
				{key:"confetti",frame: "10"},
				{key:"confetti",frame: "11"},
				{key:"confetti",frame: "12"},
				{key:"confetti",frame: "13"},
				{key:"confetti",frame: "14"},
				{key:"confetti",frame: "15"},
				{key:"confetti",frame: "16"},
				{key:"confetti",frame: "17"},
				{key:"confetti",frame: "18"},
				{key:"confetti",frame: "19"},
				{key:"confetti",frame: "20"},
				{key:"confetti",frame: "21"},
				{key:"confetti",frame: "22"},
				{key:"confetti",frame: "23"},
				{key:"confetti",frame: "24"},
				{key:"confetti",frame: "25"},
				{key:"confetti",frame: "26"},
				{key:"confetti",frame: "27"},
				{key:"confetti",frame: "28"},
				{key:"confetti",frame: "29"},
				{key:"confetti",frame: "30"},
				{key:"confetti",frame: "31"},
				{key:"confetti",frame: "32"},
				{key:"confetti",frame: "33"},
				{key:"confetti",frame: "34"},
				{key:"confetti",frame: "35"},
				{key:"confetti",frame: "36"},
				{key:"confetti",frame: "37"},
				{key:"confetti",frame: "38"},
				{key:"confetti",frame: "39"},
			],
			frameRate: 30,
			repeat:-1
		});
		this.confetti.play("Celebrate");
		/*this.anims.create({
			key:"Celebrate",
			frames:
			this.anims.generateFrameNames("confetti",
				{
					start: 0,
					end: 59,
					zeroPad:2,
					prefix:"",
					suffix:".png"
				}),
			frameRate:30,
			repeat:-1,
		});
		this.confetti=this.add.sprite(200,200,"confetti");
		this.confetti.play("Celebrate");*/
	}

	update()
	{

	}
}

export default Scene_Leaderboard;
