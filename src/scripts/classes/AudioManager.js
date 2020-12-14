import AudioChannel from "./AudioChannel.js";

class MasterChannel extends AudioChannel
{
	get effectiveVolume()
	{
		return this.desiredVolume;
	}

	constructor(audioManager)
	{
		super(audioManager, "master");
	}

	setVolume(val)
	{
		super.setVolume(val);

		for (const channel of Object.values(this.audio.channels))
			channel.updateVolume();
	}
}

/**
 * @class Manages the Audio Managers for this game and allows for easy access to a global play function.
 */
class AudioManager
{
	constructor(game, managers = [])
	{
		this.game = game;
		this.channels = {};

		for (const key of managers)
		{
			this.channels[key] = new AudioChannel(this, key);
			this[key] = this.channels[key];
		}

		if (!this.master)
			this.master = new MasterChannel(this);
	}
}

export default AudioManager;
