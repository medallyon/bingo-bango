import * as Phaser from "phaser";
import { ScrollablePanel, FixWidthSizer } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle.js";

class PlayerlistItem extends Phaser.GameObjects.Container
{
	constructor(data = {})
	{
		super(data.container.playerlist.scene, 0, 0);

		this.container = data.container;
		this.id = data.id;
		this.name = data.name;

		this.text = new Phaser.GameObjects.Text(this.scene, 0, 0, this.name, {
			align: "left",
			fontSize: 32,
			fontStyle: "bold"
		});
		this.text.setStroke("#000", 5)
			.setOrigin(.5);
		this.add(this.text);

		this.image = new Phaser.GameObjects.Image(this.scene, -24, 0, data.texture);
		this.add(this.image);
	}

	destroy()
	{
		super.destroy();

		const index = this.container.findIndex(p => p.id === this.id);
		if (index === -1)
			return false;
		return this.container.splice(index, 1);
	}
}

class PlayerContainer extends Array
{
	constructor(list)
	{
		super();
		this.playerlist = list;
	}

	add(player)
	{
		return new Promise((resolve, reject) =>
		{
			console.log("PlayerContainer.add", player.id, this);
			if (player.provider === "discord")
			{
				this.playerlist.load.on("loaderror", file =>
				{
					if (file.src === player.avatarURL)
						reject();
				});
				this.playerlist.load.on("filecomplete", key =>
				{
					if (key !== `avatar_${player.id}`)
						return;

					const item = new PlayerlistItem({
						container: this,
						x: 0, y: 36 * this.length,
						id: player.id,
						name: player.tag,
						texture: key
					});

					this.push(item);
					this.playerlist.update();

					resolve(this.playerlist);
				});

				this.playerlist.load.image(`avatar_${player.id}`, player.avatarURL);
				return this.playerlist.load.start();
			}

			else
			{
				const item = new PlayerlistItem({
					container: this,
					x: 0, y: 36 * this.length,
					id: player.id,
					name: player.tag,
					texture: "avatar_guest"
				});

				this.push(item);
				this.playerlist.update();

				resolve(this.playerlist);
			}
		});
	}
}

class Playerlist extends Phaser.GameObjects.Container
{
	static preload(load)
	{
		load.setPath("assets/img/UI/");
		load.image("avatar_guest", "avatar_guest.png");
	}

	update()
	{
		const sizer = this.panel.getElement("panel");

		sizer.clear(true);
		for (let i = 0; i < this.players.length; i++)
		{
			if (i !== 0)
				sizer.addNewLine();

			// rexUI bugs out on adding containers to its custom sizer
			// sizer.add(this.players[i]);
			sizer.add(this.players[i].text);
		}

		this.panel.layout();
	}

	constructor(data)
	{
		super(data.scene, data.x, data.y);

		this.panel = new ScrollablePanel(this.scene, Object.assign({
			width: 250,
			height: 220,

			scrollMode: 0,

			panel: {
				child: new FixWidthSizer(data.scene, {
					space: {
						left: 3,
						right: 3,
						top: 3,
						bottom: 3,
						item: 8,
						line: 8,
					}
				}),

				mask: {
					padding: 1
				},
			},

			space: {
				left: 10,
				right: 10,
				top: 10,
				bottom: 10,

				panel: 10,
			}
		}, data.panel));
		this.add(this.panel.layout());

		this.players = new PlayerContainer(this);

		this.scene.add.existing(this);
	}
}

export default Playerlist;
