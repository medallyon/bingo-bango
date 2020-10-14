class Button extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y, number)
	{
		super(scene, x, y, "card_button");
		scene.add.existing(this);

		this.setDisplaySize(100, 100);
		this.setDepth(-100);

		if (number == null)
			number = Math.floor(Math.random() * 75);

		this.text = this.scene.add.text(this.getCenter().x - 16, this.getCenter().y - 16,
			number.toString(),
			{
				align: "center",
				fontSize: 32
			}
		);

		this.setInteractive()
			.on("pointerup", () =>
			{
				
			});
	}
}

export default Button;
