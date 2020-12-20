import * as Phaser from "phaser";

class AudioChannel extends Phaser.Sound.HTML5AudioSoundManager
{
	get _volumes()
	{
		return this.settings.get("volumes");
	}

	// volume as desired by user settings
	get desiredVolume()
	{
		return this._volumes[this.key];
	}

	// takes master vol into account
	get effectiveVolume()
	{
		return this.audio.master.volume * this.desiredVolume;
	}

	constructor(audioManager, settingKey)
	{
		super(audioManager.game);

		this.game = audioManager.game;
		this.settings = this.game.settings;
		this.audio = audioManager;
		this.key = settingKey;
	}

	setVolume(val)
	{
		const volumes = this._volumes;
		val = Math.max(0, Math.min(1, val));

		volumes[this.key] = val;
		this.settings.set("volumes", volumes);

		return this.updateVolume();
	}

	updateVolume()
	{
		return super.setVolume(this.effectiveVolume);
	}
}

export default AudioChannel;
