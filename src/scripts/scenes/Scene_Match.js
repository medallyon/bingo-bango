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

		this.waitingText = null;
		this.connection = null;

		this.cards = 2;
		this.interval = 7.5;
		this.players = null;
		this.match = null;

		this.cardHolder = null;
		this.queue = null;
		this.score = {
			tracker: null,
			board: null,
			players: {}
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
		this.game.audio.effects.play("audio_effects_cheering", { volume: .25 });
	}

	_createCards(layout = 2)
	{
		this.cardHolder = new CardHolder(layout, this, this.width * .5, this.height * (layout < 3 ? .25 : .12));
		this.add.existing(this.cardHolder);
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

	_createScoreBoard()
	{
		this.score.board = this.rexUI.add.scrollablePanel({
			x: this.width * .85,
			y: this.height * .5,
			width: this.width * .2,
			height: this.height * .4,

			scrollMode: 0,

			background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0x222d2e),//0x222d2e

			panel: {
				child: this.rexUI.add.fixWidthSizer({
					align: "right",
					anchor: "center",
					space: {
						left: 5,
						right: 5,
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
		}).layout();
		this.updateScores();
	}

	_createBallCounter()
	{
		// Ball Counter Panel
		this.add.image(this.game.renderer.width / 21, this.game.renderer.height / 10, "panel_ball_count")
			.setScale(0.4);
		// Ball Counter Text
		this.add.text({
			x: this.width / 21,
			y: this.height / 10,
			text: "Ball Counter",
			style: {
				font: "18px monospace",
				fill: "#FFFFFF",
				align: "center"
			}
		}).setOrigin(.5);
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

		this.cards = data.cards;
		this.interval = data.interval;
		this.players = data.players;
		this.match = data.match;

		this.score.players = new Map();
		for (const player of this.players.values())
			this.score.players.set(player.id, 0);

		this.connection = this.game.connection;
		this.connection.matchScene = this;

		// [Button] Exit Match
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

		this._createBallCounter();
		this._createCards(this.cards);
		this._createScoreTracker();
		this._createScoreBoard(this.players);
		this._createBallQueue();
		this.cardHolder.visible = false;
		this.score.tracker.visible = false;
		this.score.board.visible = false;
		this.queue.visible = false;

		(this.waitingText = this.add.text({
			x: this.width * .5,
			y: this.height * .5,
			text: "Waiting for Players...",
			style: {
				fontSize: 42,
				fill: "#FFFFFF",
				align: "center"
			}
		}))
			.setOrigin(.5)
			.setStroke("#fff", 6);

		this.connection.match.onMessage("match-score-update", msg =>
		{
			this.score.players.set(msg.id, msg.score);
			this.updateScores();
		});

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

	updateScores()
	{
		const sizer = this.score.board.getElement("panel");

		sizer.clear(true);
		for (const [ id, score ] of this.score.players.entries())
		{
			const item = this.add.text(0, 0, `${this.players.get(id).tag}: ${score}`, {
				x: this.width / 1.6,
				y: this.height / 5,
				align: "right",
				fontSize: 28,
				fontStyle: "bold"
			});
			item.setOrigin(.5)
				.setStroke("#000", 5);

			sizer.add(item);
		}

		this.score.board.layout();
		return this.score.board;
	}

	start()
	{
		this.waitingText.destroy();

		this.cardHolder.visible = true;
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
