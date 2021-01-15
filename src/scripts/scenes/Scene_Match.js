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
			x: this.width * .1,
			y: this.height * .075,
			userDecision: "Are you sure you want to leave the match and return to the menu?",
			defaultButtonEvents: true,
			clickCallback: () =>
			{
				this.connection.leaveMatch();
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
		// display final scores panel + back button
	}
}

export default Scene_Match;
