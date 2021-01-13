import Scene from "../objects/Scene.js";
import CardHolder from "../objects/CardHolder.js";
import ScoreTracker from "../objects/ScoreTracker.js";
import ScoreBoard from "../objects/ScoreBoard.js";
import BallQueue from "../objects/BallQueue.js";

class Scene_Match extends Scene
{
	get _defaultInterval()
	{
		return () =>
		{
			const ball = this.queue.createRandomBall();
			this.queue.push(ball);

			const voicepack = this.game.announcer
				, variation = voicepack[ball.column].get(ball.number).random();
			this.game.audio.voice.play(variation);

			if (++this.flow.counted === 45)
				clearInterval(this.flow.interval);
		};
	}

	constructor()
	{
		super({
			key: "Scene_Match",
			wallpaper: true
		});

		this.connection = null;
		this.flow = {
			counted: 0,
			interval: null
		};

		this.score = {
			tracker: null,
			board: null
		};

		this.cards = null;
		this.queue = null;
	}

	_createCards(layout = 2)
	{
		this.cards = new CardHolder(layout, this, this.width * .5, this.height * (layout < 3 ? .25 : .12));
		this.add.existing(this.cards);
	}

	_createScoreBoard()
	{
		this.score.board = new ScoreBoard({
			scene: this,
			x: this.width * .88,
			y: this.height * .5
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

		this.score.tracker = new ScoreTracker({
			scene: this,
			x: this.width * .88,
			y: this.height * .1
		});
		this.score.tracker.setScale(.65);
		this.add.existing(this.score.tracker);

		this._createCards(data.cards || 2);
		this._createScoreBoard();
		this._createBallQueue();

		this.flow.counted = 0;
		this.flow.interval = setInterval(this._defaultInterval, data.timeBetweenCalls || 7500);
	}

	update()
	{

	}
}

export default Scene_Match;
