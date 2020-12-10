import * as Phaser from "phaser";

class Setting extends Phaser.GameObjects.Container
{
	get value()
	{
		const settings = this.scene.game.settings;
		return this.subKey ? settings.get(this.key)[this.subKey] : settings.get(this.key);
	}
	set value(x)
	{
		const settings = this.scene.game.settings;
		if (this.subKey)
		{
			const val = settings.get(this.key);
			val[this.subKey] = x;
			settings.set(this.key, val);
		}

		else
			settings.set(this.key, x);
	}

	constructor(data)
	{
		super(data.scene, data.x, data.y);

		this.key = data.key.split(".")[0];
		this.subKey = data.subKey || data.key.split(".")[1] || null;

		this.element = null;
		this.valueText = null;
	}
}

export default Setting;
