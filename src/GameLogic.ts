class GameLogic {
	private _gameStage: egret.Sprite;
	private bvm: ButtonViewManage;
	private _chessView: ChessView;

	private _me = true;
	private _isOver: boolean = false;
	public constructor(gameStage: egret.Sprite) {
		this._gameStage = gameStage;
		this.init();
	}

	private init() {
		GameData.initData(); // 初始化数据

		let levelConfigData = RES.getRes("levelConfig_json");
		LevelGameDataParse.parseLevelGameData(levelConfigData.middle);

		// 加入棋盘
		let cbc: egret.Sprite = new egret.Sprite();
		let chessboard: ChessBoard = new ChessBoard(cbc);
		this._gameStage.addChild(cbc);

		// 加入棋子
		let chessView: ChessView = this._chessView = new ChessView();
		this._gameStage.addChild(chessView);

		// 加入按钮组
		let bvmc:egret.Sprite = new egret.Sprite();
		this._gameStage.addChild(bvmc);
		this.bvm = new ButtonViewManage(bvmc);

		chessboard.addEventListener(ChessBoardEvent.MOVE_PAWN, this.move_pawn, this);
		this.bvm.addEventListener(ButtonViewManageEvent.TAP_UNDO, this.tap_undo, this);
		this.bvm.addEventListener(ButtonViewManageEvent.TAP_TIPS, this.tap_tips, this);
		this.bvm.addEventListener(ButtonViewManageEvent.TAP_REPLAY, this.tap_replay, this);
	}

	private move_pawn(evt) {
		if(this._isOver) return;
		let {numX, numY} = evt;
		if (GameData.chessBoard[numX][numY] !== 0) return;
		let userMoveCommand = new UserMovePawnCommand(numX, numY, this._me, this._chessView);
		GameData.movePawnCommands.push(userMoveCommand);
		this._isOver = userMoveCommand.execute();
		

		if(!this._isOver) {
			this._me = !this._me;
			let computerMoveCommand = new ComputerMovePawnCommand(this._chessView);
			GameData.movePawnCommands.push(computerMoveCommand);
			this._isOver = computerMoveCommand.execute();
		}
	}

	private tap_undo(evt) {
		for(let i = 0; i < 2; i++) {
			let command = GameData.movePawnCommands.pop();
			command.undo();
		}
	}

	private tap_tips(evt) {
		let {numX, numY} = GameData.getNextStep(true);
		this._chessView.addTipChess(numX, numY);
	}

	private tap_replay() {
		GameData.initData();
		this._chessView.init();
	}
}