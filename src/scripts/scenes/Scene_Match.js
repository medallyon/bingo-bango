import Scene from "../objects/Scene.js";
import CardHolder from "../objects/CardHolder.js";
import ScoreTracker from "../objects/ScoreTracker.js";
import ScoreBoard from "../objects/ScoreBoard.js";
import BallQueue from "../objects/BallQueue.js";
import SceneButton from "../objects/SceneButton.js";

class Scene_Match extends Scene
{
	constructor()
	{
		super({
			key: "Scene_Match",
			wallpaper: true
		});

		this.connection = null;

		this.waitingText = null;

		this.cards = null;
		this.queue = null;
		this.score = {
			tracker: null,
			board: null
		};
	}

	_createConfetti()
	{
		this.anims.create({
			key: "Confetti",
			frames: this.anims.generateFrameNames("confetti", {start:0, end:59, zeroPad:2, prefix:"confetti_", suffix:".png"}),
			frameRate:30,
			repeat:0,
			hideOnComplete: true,
		});
		this.confetti=this.add.sprite(this.width / 2,this.height / 1,"confetti");
		this.confetti.play("Confetti");
		this.game.audio.effects.play("audio_effects_cheering", {
			volume: .25
		});
	}

	_createCards(layout = 2)
	{
		this.cards = new CardHolder(layout, this, this.width * .5, this.height * (layout < 3 ? .25 : .12));
		this.add.existing(this.cards);
	}

	_createScoreTracker()
	{
		this.score.tracker = new ScoreTracker({
			scene: this,
			x: this.width * .88,
			y: this.height * .1
		});
		this.score.tracker.setScale(.65);
		this.add.existing(this.score.tracker);
	}

	_createScoreBoard(players = {})
	{
		this.score.board = new ScoreBoard({
			scene: this,
			x: this.width * .88,
			y: this.height * .5,
			players
		});
		this.score.board.setScale(.5);
		this.add.existing(this.score.board);
	}

	_createBallQueue()
	{
		this.queue = new BallQueue({
			scene: this,
			x: this.width * .15,
			y: this.height * .5
		});
		this.queue.setScale(.6);
		this.add.existing(this.queue);
	}

	create(data = {})
	{
		super.create(data);

		this.connection = this.game.connection;
		this.connection.matchScene = this;
		this.add.existing(new SceneButton(null, {
			scene: this,
			x: this.width / 1.12,
			y: this.height / 1.1,
			userDecision: "Are you sure you want to leave the match and return to the menu?",
			defaultButtonEvents: true,
			texture: "button_exit",
			clickCallback: () =>
			{
				this.connection.leaveMatch();
			}
		}).setScale(.5));

		this._createCards(data.cards || 2);
		this._createScoreTracker();
		this._createScoreBoard(data.players);
		this._createBallQueue();
		this.cards.visible = false;
		this.score.tracker.visible = false;
		this.score.board.visible = false;
		this.queue.visible = false;

		(this.waitingText = this.add.text({
			x: this.width / 2,
			y: this.height / 2,
			text: "Waiting for Players...",
			style: {
				fontSize: 42,
				fill: "#FFFFFF",
				align: "center"
			}
		}))
			.setOrigin(.5)
			.setStroke("#fff", 6);

		this.connection.match.send("match-ready");
	}

	playBall(ball)
	{
		this.queue.push(this.queue.createBall(ball.column, ball.number));

		const voicepack = this.game.announcer
			, variation = voicepack[ball.column].get(ball.number).random();
		this.game.audio.voice.play(variation);
	}

	bingo()
	{
		this.score.tracker.score += 500;

		const voicepack = this.game.announcer;
		this.game.audio.voice.play(voicepack.BINGO.random());

		this._createConfetti();
	}

	updateScores(scores)
	{

	}

	start()
	{
		this.waitingText.destroy();

		this.cards.visible = true;
		this.score.tracker.visible = true;
		this.score.board.visible = true;
		this.queue.visible = true;
	}

	end()
	{
		this.time.delayedCall(this.interval, () =>
		{
			/* End Panel */
			this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "panel_end");
			this.add.existing(new SceneButton("Scene_Menu_Main", {
				scene: this,
				x: this.width * .5,
				y: this.height * .9,
				defaultButtonEvents: true,
				texture: "button_main_menu"
			}).setScale(.5));

			this.make.text({
				x: this.width / 2.4,
				y: this.height / 3.2,
				text: "Name",
				style: {
					font: "30px monospace",
					fill: "#FFFFFF",
					align: "center"
				}
			}).setOrigin(.5);

			this.make.text({
				x: this.width / 1.7,
				y: this.height / 3.2,
				text: "Score",
				style: {
					font: "30px monospace",
					fill: "#FFFFFF",
					align: "center"
				}
			}).setOrigin(.5);

			// ANIMATION
			this._createConfetti();
		});
	}
}

export default Scene_Match;
