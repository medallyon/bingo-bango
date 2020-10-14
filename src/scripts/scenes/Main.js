import PhaserLogo from "../objects/phaserLogo";
import Button from "../objects/button";
import FpsText from "../objects/fpsText";

class MainScene extends Phaser.Scene
{
	constructor()
	{
		super({ key: "MainScene" });
	}

	create()
	{
		new PhaserLogo(this, this.cameras.main.width / 2, 0);
		this.fpsText = new FpsText(this);

		const bingoButtons = [];
		for (let i = 0; i < "bingo".length; i++)
			bingoButtons.push(new Button(this,
					110 + (i * (bingoButtons.length ? bingoButtons[i - 1].displayWidth : 100) * 1.2),
					110,
					"BINGO"[i]
				)
			);

		const buttons = [];
		for (let i = 0; i < 5; i++)
		{
			buttons.push([]);
			for (let j = 0; j < 5; j++)
				buttons[i].push(
					new Button(this,
						110 + (i * (buttons[i].length ? buttons[i][j - 1].displayWidth : 100) * 1.2),
						250 + (j * (buttons[i].length ? buttons[i][j - 1].displayHeight : 100) * 1.2)
					)
				);
		}
	}

	update()
	{
		this.fpsText.update();
	}
}

export default MainScene;
