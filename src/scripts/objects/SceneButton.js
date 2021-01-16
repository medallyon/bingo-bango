import Button from "./buttons/Button.js";

class SceneButton extends Button
{
	constructor(targetScene, data)
	{
		if (!data.on)
			data.on = {};

		const cb = data.clickCallback
			, oldEvent = data.on.pointerup;
		data.on.pointerup = (pointer) =>
		{
			// left mouse button
			if (pointer.button !== 0)
				return;

			let decision = true;
			if ((typeof data.userDecision) === "string")
				decision = window.confirm(data.userDecision.length ? data.userDecision : "Are you sure you want to go back to the previous scene?");

			if (!decision)
				return;

			if (cb && (typeof cb) === "function")
				cb.call(this, pointer);

			if (oldEvent && (typeof oldEvent) === "function")
				oldEvent.call(this, pointer);

			data.scene.scene.stop();
			data.scene.scene.start(targetScene, data.sceneData);
		};

		super(Object.assign({
			texture: "button_back"
		}, data));
	}
}

export default SceneButton;
