import Slider from "./Slider.js";

class VolumeSlider extends Slider
{
	constructor(data)
	{
		super(Object.assign({
			valuechangeCallback: (val) =>
			{
				const channel = data.key.split(".")[1];
				data.scene.game.audio[channel].setVolume(val);
			}
		}, data));
	}
}

export default VolumeSlider;
