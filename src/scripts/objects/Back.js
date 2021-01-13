import Button from "./buttons/Button.js";

class Back extends Button
{
	constructor(targetScene, data)
	{
		if (!data.on)
			data.on = {};

		const oldEvent = data.on.pointerup;
		data.on.pointerup = (pointer) =>
		{
			// left mouse button
			if (pointer.button !== 0)
				return;

			let decision = true;
			if (data.userDecision)
				decision = window.confirm("Are you sure you want to go back to the previous scene?");

			if (!decision)
				return;

			if (oldEvent && (typeof oldEvent) === "function")
				oldEvent.call(this, pointer);

			data.scene.scene.sleep();
			data.scene.scene.run(targetScene);
		};

		super(Object.assign({
			texture: "button_back"
		}, data));
	}
}

export default Back;
