import * as Phaser from "phaser";

class Confetti extends Phaser.GameObjects.Container
{
	constructor(data)
	{
		super(data.scene, data.x, data.y);
		//This is the proper way to do it but it does not work.The issue is probably at the zeroPad or Prefix line
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

		this.anims.create({
			key: "Celebrate",
			repeat: -1,
			frames: this.anims.generateFrameNames("confetti", {
				prefix: "",
				suffix:".png",
				end: 0,
				zeroPad: 59
			})
		});
	}
}

export default Confetti;
