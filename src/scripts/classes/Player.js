import Hashids from "hashids";
const hash = new Hashids("bingo-bango", 6);

class Player
{
	get tag()
	{
		return `${this.username}#${this.discriminator}`;
	}

	get avatarURL()
	{
		if (this.provider !== "discord")
			return undefined;
		return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.png`;
	}

	constructor(user = {})
	{
		this.provider = user.provider;
		this.username = user.username || "Guest";
		this.discriminator = user.discriminator || (new Array(4)).fill(0).reduce((acc) => acc += Math.floor(Math.random() * 10).toString(), "");
		this.id = user.id || hash.encode(Math.floor(Math.random() * 1000000));
		this.avatar = user.avatar || "";
	}

	// eslint-disable-next-line
	toJson() { return this.toJSON(); }
	toJSON()
	{
		return {
			provider: this.provider,
			id: this.id,
			username: this.username,
			discriminator: this.discriminator,
			tag: this.tag,
			avatar: this.avatar
		};
	}
}

export default Player;