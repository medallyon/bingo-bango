/**
 * @class Manages the Audio Managers for this game and allows for easy access to a global play function.
 */
class AudioManager
{
	constructor(managers = {})
	{
		for (const [ key, man ] of Object.entries(managers))
			this[key] = man;
	}

	/**
	 * @param {string} key - The asset key to play (audio)
	 * @param {Phaser.Sound.BaseSoundManager} manager - The manager to use to play the sound. Defaults to master if one was declared in the constructor.
	 * @param {number} [volume=1] - Volume to play at (0..1)
	 * @returns {boolean} - Whether the sound successfully started playing
	 */
	play(key, manager, volume = 1)
	{
		if (manager == null)
			manager = this.master || null;

		if (!manager)
			return false;

		// Multiply the volume value with the master volume
		volume = (this.master) ? volume * this.master.volume : volume;
		return manager.play(key, volume);
	}
}

export default AudioManager;
