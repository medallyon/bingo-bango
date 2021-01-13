import * as Phaser from "phaser";

class Confetti extends Phaser.GameObjects.Container
{
	constructor(data)
	{
		super(data.scene, data.x, data.y);
		this.animation = {};
		this.anims.create({
			key:"Celebrate",
			frames:
			this.anims.generateFrameNames("confetti",
				{
					start: 0,
					end: 59,
					zeroPad:2,
					prefix:"confetti_",
					suffix:".png"
				}),
			frameRate:30,
			repeat:-1,
		});
		this.confetti=this.add.sprite(200,200,"confetti");
		this.confetti.play("Celebrate");
	}
}

export default Confetti;
