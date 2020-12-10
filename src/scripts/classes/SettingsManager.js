import * as store from "store";
import * as storeDefaults from "store/plugins/defaults";

/**
 * @class A wrapper class that stores and manages Settings.
 */
class SettingsManager extends Map
{
	static get DEFAULTS()
	{
		return {
			"volumes": {
				master: .5,
				music: 1,
				voice: 1,
				effects: 1
			},
			"voicePack": "deyan"
		};
	}

	_composeDefaults()
	{
		store.addPlugin(storeDefaults);
		store.defaults(SettingsManager.DEFAULTS);
	}

	_populateFromStore()
	{
		for (const key of Object.keys(SettingsManager.DEFAULTS))
			super.set(key, store.get(key));
	}

	constructor()
	{
		super();

		this._composeDefaults();
		this._populateFromStore();
	}

	get(key)
	{
		if (!super.has(key))
		{
			const existing = store.get(key);
			if (existing)
				super.set(key, existing);
		}

		return super.get(key);
	}

	set(key, val)
	{
		store.set(key, val);
		return super.set(key, val);
	}

	delete(key)
	{
		store.remove(key);
		return super.delete(key);
	}

	clear()
	{
		store.each((val, key) =>
		{
			store.remove(key);
		});

		return super.clear();
	}
}

export default SettingsManager;
