/**
 * @class Manages the Audio Managers for this game and allows for easy access to a global play function.
 */
class AudioManager
{
	constructor(managers = {})
	{
		this.managers = managers;
		for (const [ key, man ] of Object.entries(managers))
			this[key] = man;
	}

	/**
	 * @param {string} key - The asset key to play (audio)
	 * @param {Phaser.Sound.BaseSoundManager} manager - The manager to use to play the sound. Defaults to master if one was declared in the constructor.
	 * @param {number} [volume=1] - Volume to play at (0..1)
	 * @returns {boolean} - Whether the sound successfully started playing
	 */
	play(key, channel = "master", volume = 1, config = {})
	{
		let manager;
		if (typeof channel === "string" && this.managers[channel])
			manager = this.managers[channel];
		else
			return false;

		// Multiply the volume value with the master volume and the channel volume
		volume = manager.volume * ((this.master) ? volume * this.master.volume : volume);

		return manager.play(key, Object.assign(config, { volume }));
	}
}

export default AudioManager;
