class PhaserLogo extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y)
	{
		super(scene, x, y, "phaser-logo");

		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.setDrag(10);

		this.setCollideWorldBounds(true)
			.setBounce(0.6)
			.setInteractive()
			.on("pointerdown", () =>
			{
				this.setVelocityY(-400);
				this.setVelocityX(Math.random() * (400 - -400) + -400);
			});
	}
}

export default PhaserLogo;
