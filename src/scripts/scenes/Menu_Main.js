import * as Phaser from "phaser";


class Menu_MainScene extends Phaser.Scene
{

	constructor()
	{
		super({ key: "Menu_MainScene" });


		this.cards = null;
		this.score = {
			tracker: null,
			board: null
		};
	}

	create(data = {})
	{
		//var video;

	    /* Wallpaper */
		this.wallpaper = new Phaser.GameObjects.Image(this,this.cameras.main.width/2,this.cameras.main.height/2,"bg_wallpaper02");
		this.wallpaper.setScale(0.7111);
		this.add.existing(this.wallpaper);

		/* Animation */
		var vid = this.add.video(0, 0, "confetti");

		vid.play(true);
		//this.add.video("confetti");
		//video = this.add.video(this.game.renderer.width / 0,0,"confetti");
		//video.play(true);

        /* Logo */
        this.add.image(this.game.renderer.width / 2,this.game.renderer.height * 0.20,"bg_logo").setScale(0.5,0.5);

        /* Buttons */
        var spritePlay = this.add.image(this.game.renderer.width / 2,this.game.renderer.height * 0.45,"bg_play").setScale(0.5,0.5).setInteractive();
		var spriteScoreboard = this.add.image(this.game.renderer.width / 2,this.game.renderer.height * 0.60,"bg_buttonScoreboard").setScale(0.5,0.5).setInteractive();
		var spriteSettings = this.add.image(this.game.renderer.width / 2,this.game.renderer.height * 0.75,"bg_settings").setScale(0.5,0.5).setInteractive();
		var spriteExit = this.add.image(this.game.renderer.width / 2,this.game.renderer.height * 0.90,"bg_exit").setScale(0.5,0.5).setInteractive();


        spritePlay.on("pointerdown", function (pointer) {
        	this.setTint(0xff0000);

		});

        spritePlay.on("pointerout", function (pointer)
		{
			this.clearTint();

		});
        spritePlay.on("pointerup",function (pointer) {
			this.clearTint();
			this.scene.start('MainScene');

		});

	}

	update()
	{

	}
}

export default Menu_MainScene;
