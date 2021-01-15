import * as Phaser from "phaser";

class Animations extends Phaser.GameObjects.Container
{
	constructor(data)
	{
		super(data.scene, data.x, data.y);
		//ANIMATION
		/*this.anims.create({
			key:"Confetti",
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
			repeat:0,
			hideOnComplete: true,
		});
		this.confetti=this.add.sprite(this.width / 2,this.height / 2,"confetti");
		this.confetti.play("Confetti")*/
	}
	_createConfetti()
	{
		this.anims.create({
			key: "Confetti",
			frames: this.anims.generateFrameNames("confetti", {start:0, end:59, zeroPad:2, prefix:"confetti_", suffix:".png"}),
			frameRate:30,
			repeat:0,
			hideOnComplete: true,
		});
		this.confetti=this.add.sprite(this.width / 2,this.height / 2,"confetti");
		this.confetti.play("Confetti");
	}
	makeAnim(key,frameName)
	{
		let myArray = [];
		for(var i = 0; i < 58; i++)
		{
			let fn=frameName + 1 + ".png";
			myArray.push({
				key: key,
				frame: fn
			});
		}
		return myArray;
	}
}

export default Animations;
