import Scene from "../objects/Scene.js";
import CardHolder from "../objects/CardHolder.js";
import ScoreTracker from "../objects/ScoreTracker.js";
import ScoreBoard from "../objects/ScoreBoard.js";
import BallQueue from "../objects/BallQueue.js";
import Back from "../objects/Back.js";

class Scene_Match extends Scene
{
	constructor()
	{
		super({
			key: "Scene_Match",
			wallpaper: true
		});

		this.connection = null;

		this.score = {
			tracker: null,
			board: null
		};

		this.cards = null;
		this.queue = null;
	}

	_createCards(layout = 2)
	{
		if (this.cards)
			this.cards.destroy();

		this.cards = new CardHolder(layout, this, this.width * .5, this.height * (layout < 3 ? .25 : .12));
		this.add.existing(this.cards);
	}

	_createScoreTracker()
	{
		if (this.score.tracker)
			return this.score.tracker.score = 0;

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
		if (this.score.board)
		{
			// clean text and re-populate
			return;
		}

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
		if (this.queue)
			return this.queue.reset();

		this.queue = new BallQueue({
			scene: this,
			x: this.width * .15,
			y: this.height * .5
		});
		this.queue.setScale(.6);
		this.add.existing(this.queue);
	}

	wake(data)
	{
		super.create(data);

		this.game.matchScene = this;
		this.connection = this.game.connection;

		this._createCards(data.cards || 2);
		this._createScoreTracker();
		this._createScoreBoard(data.players);
		this._createBallQueue();

		this.connection.match.send("match-ready");
	}

	create(data = {})
	{
		super.create(data);

		this.game.matchScene = this;
		this.connection = this.game.connection;

		this.add.existing(new Back("Scene_Menu_Main", {
			scene: this,
			x: this.width * .1,
			y: this.height * .075,
			userDecision: true,
			defaultButtonEvents: true,
			on: {
				pointerup: this.connection.leaveMatch
			}
		}).setScale(.5));

		this._createCards(data.cards || 2);
		this._createScoreTracker();
		this._createScoreBoard(data.players);
		this._createBallQueue();

		this.connection.match.send("match-ready");
	}

	playBall(ball)
	{
		this.queue.push(this.queue.createBall(ball.column, ball.number));

		const voicepack = this.game.announcer
			, variation = voicepack[ball.column].get(ball.number).random();
		this.game.audio.voice.play(variation);
	}

	updateScores(scores)
	{

	}

	end()
	{
		// return to main menu / lobbies screen
	}
}

export default Scene_Match;
