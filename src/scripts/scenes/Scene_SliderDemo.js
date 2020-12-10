const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

import * as Phaser from "phaser";

class Scene_Menu_Settings extends Phaser.Scene
{
	get width()
	{
		return this.cameras.main.width;
	}
	get height()
	{
		return this.cameras.main.height;
	}

	constructor()
	{
		super({ key: "Scene_Menu_Settings" });

		this.settings = {
			volume: {
				master: .5,
				music: 1,
				voice: 1,
				effects: 1
			},
			voicepacks: [
				"deyan"
			]
		};
	}

	preload()
	{
		/*this.load.setPath("assets/plugin");
		this.load.scenePlugin({
			key: "rexuiplugin",
			url: "rexui.js",
			sceneKey: "rexUI"
		});*/
	}

	create()
	{
		/* Wallpaper */
		this.wallpaper = new Phaser.GameObjects.Image(this, this.cameras.main.width / 2, this.cameras.main.height / 2, `bg_wallpaper_0${Math.floor(Math.random() * 4)}`).setDepth(0);
		this.wallpaper.setScale(0.7111);
		this.add.existing(this.wallpaper);

		/* Panel */
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.50, "bg_panel_settings")
			.setScale(0.7);

		const settingsText = {
			volume: {
				master: this.add.text(this.width * .65, this.height * .25, `${(this.settings.volume.master * 100).toFixed(0)}%`, {
					color: 0x11111,
					align: "center"
				}),
				music: this.add.text(this.width * .65, this.height * .35, `${(this.settings.volume.music * 100).toFixed(0)}%`, {
					color: 0x11111,
					align: "center"
				}),
				voice: this.add.text(this.width * .65, this.height * .45, `${(this.settings.volume.voice * 100).toFixed(0)}%`, {
					color: 0x11111,
					align: "center"
				}),
				effects: this.add.text(this.width * .65, this.height * .55, `${(this.settings.volume.effects * 100).toFixed(0)}%`, {
					color: 0x11111,
					align: "center"
				})
			}
		};

		// TODO: Figure out implementation of SettingSlider
		/*new Setting.Slider(this, {

		});*/

		this.add.text(this.width * .31, this.height * .25, "Master", {
			align: "center",
			color: 0x11111,
			fontSize: 18
		});
		this.rexUI.add.slider({
			x: this.width * .5, // from
			y: this.height * .3, // to
			width: this.width * .4, // length
			height: 20, // thiccness

			orientation: "x", // "x" or "y" - down or sideways
			input: "drag", // "drag" or "click"

			track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK), // background bar
			indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY), // background active bar
			thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT), // slider button

			value: this.settings.volume.master, // active value
			valuechangeCallback: value => // on change
			{
				this.settings.volume.master = value;
				settingsText.volume.master.text = `${(value * 100).toFixed(0)}%`;
			}
		}).layout();

		this.add.text(this.width * .31, this.height * .35, "Music", {
			align: "center",
			color: 0x11111,
			fontSize: 18
		});
		this.rexUI.add.slider({
			x: this.width * .5, // from
			y: this.height * .4, // to
			width: this.width * .4, // length
			height: 20, // thiccness

			orientation: "x", // "x" or "y" - down or sideways
			input: "drag", // "drag" or "click"

			track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK), // background bar
			indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY), // background active bar
			thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT), // slider button

			value: this.settings.volume.music, // active value
			valuechangeCallback: value => // on change
			{
				this.settings.volume.music = value;
				settingsText.volume.music.text = `${(value * 100).toFixed(0)}%`;
			}
		}).layout();

		this.add.text(this.width * .31, this.height * .45, "Voice", {
			align: "center",
			color: 0x11111,
			fontSize: 18
		});
		this.rexUI.add.slider({
			x: this.width * .5, // from
			y: this.height * .5, // to
			width: this.width * .4, // length
			height: 20, // thiccness

			orientation: "x", // "x" or "y" - down or sideways
			input: "drag", // "drag" or "click"

			track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK), // background bar
			indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY), // background active bar
			thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT), // slider button

			value: this.settings.volume.voice, // active value
			valuechangeCallback: value => // on change
			{
				this.settings.volume.voice = value;
				settingsText.volume.voice.text = `${(value * 100).toFixed(0)}%`;
			}
		}).layout();

		this.add.text(this.width * .31, this.height * .55, "Effects", {
			align: "center",
			color: 0x11111,
			fontSize: 18
		});
		this.rexUI.add.slider({
			x: this.width * .5, // from
			y: this.height * .6, // to
			width: this.width * .4, // length
			height: 20, // thiccness

			orientation: "x", // "x" or "y" - down or sideways
			input: "drag", // "drag" or "click"

			track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK), // background bar
			indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY), // background active bar
			thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT), // slider button

			value: this.settings.volume.effects, // active value
			valuechangeCallback: value => // on change
			{
				this.settings.volume.effects = value;
				settingsText.volume.effects.text = `${(value * 100).toFixed(0)}%`;
			}
		}).layout();
	}
}

export default Scene_Menu_Settings;
