class GameLogic {
	private _gameStage: egret.Sprite;
	private _menuViewManage: MenuViewManage;
	private _leveViewManage: LevelViewManage;
	private _gameEndView: GameEndView;
	private _chessView: ChessView;

	private _levelConfigData: any;
	private _me = true;
	private _isOver: boolean = false;
	public constructor(gameStage: egret.Sprite) {
		this._gameStage = gameStage;
		this.init();
	}

	private init() {
		GameData.initData(); // 初始化数据

		let levelConfigData = this._levelConfigData = RES.getRes("levelConfig_json");
		LevelGameDataParse.parseLevelGameData(this._levelConfigData.primary); // 默认是初级的
		// 加入棋盘
		let cbvs: egret.Sprite = new egret.Sprite();
		let chessBoardView: ChessBoardView = new ChessBoardView(cbvs);
		this._gameStage.addChild(cbvs);

		// 加入棋子
		let chessView: ChessView = this._chessView = new ChessView();
		this._gameStage.addChild(chessView);

		// 加入按钮组
		let mvms:egret.Sprite = new egret.Sprite();
		this._gameStage.addChild(mvms);
		this._menuViewManage = new MenuViewManage(mvms);
		GameData.addPawnObserver(this._menuViewManage);

		// 加入关卡选择
		let lvms: egret.Sprite = new egret.Sprite();
		this._gameStage.addChild(lvms);
		this._leveViewManage = new LevelViewManage(lvms);
		this._leveViewManage.hide();

		let gevv: egret.Sprite = new egret.Sprite();
		this._gameStage.addChild(gevv);
		this._gameEndView = new GameEndView(gevv);

		chessBoardView.addEventListener(ChessBoardViewEvent.MOVE_PAWN, this.move_pawn, this);
		this._menuViewManage.addEventListener(MenuViewManageEvent.TAP_UNDO, this.tap_undo, this);
		this._menuViewManage.addEventListener(MenuViewManageEvent.TAP_TIPS, this.tap_tips, this);
		this._menuViewManage.addEventListener(MenuViewManageEvent.TAP_REPLAY, this.tap_replay, this);
		this._menuViewManage.addEventListener(MenuViewManageEvent.TAP_LEVEL, this.tap_level, this);

		this._leveViewManage.addEventListener(LevelViewManageEvent.TAP_PRIMARY, this.tap_primary, this);
		this._leveViewManage.addEventListener(LevelViewManageEvent.TAP_MIDDLE, this.tap_middle, this);
		this._leveViewManage.addEventListener(LevelViewManageEvent.TAP_ADVANCED, this.tap_advanced, this);

		this._gameEndView.addEventListener(GameEndViewEvent.TAP_SURE, this.tap_sure, this);
	}
	private initData() {
		this._me = true;
		this._isOver = false;
	}
	private move_pawn(evt) {
		if(this._isOver) return;
		let {numX, numY} = evt;
		if (GameData.chessBoard[numX][numY] !== 0) return;
		let userMoveCommand = new UserMovePawnCommand(numX, numY, this._me, this._chessView);
		GameData.movePawnCommandsPush(userMoveCommand);
		this._isOver = userMoveCommand.execute();
		if(this._isOver) {
			// GameEnd 
			this._gameEndView.show(true);
		} else {
			this._me = !this._me;
			let computerMoveCommand = new ComputerMovePawnCommand(this._chessView);
			GameData.movePawnCommandsPush(computerMoveCommand);
			this._isOver = computerMoveCommand.execute();
			if(this._isOver) {
				// GameEnd 
				this._gameEndView.show(false);
			}
		}
		
	}

	private tap_undo(evt) {
		let undoTime = (GameData.movePawnCommandsLen() % 2) === 0 ? 2 : 1;
		for(let i = 0; i < undoTime; i++) {
			let command = GameData.movePawnCommandsPop();
			command.undo();
		}
		this._me = true;
		this._isOver = false;
		this._menuViewManage.enableTips();
	}

	private tap_tips(evt) {
		let {numX, numY} = GameData.getNextStep(true);
		this._chessView.addTipChess(numX, numY);
	}

	private tap_replay() {
		GameData.initData();
		this.initData();
		this._menuViewManage.initData();
		this._chessView.init();
	}

	private tap_level() {
		this._leveViewManage.show();
	}
	private tap_primary() {
		LevelGameDataParse.parseLevelGameData(this._levelConfigData.primary);
		this.tap_replay();
	}
	private tap_middle() {
		LevelGameDataParse.parseLevelGameData(this._levelConfigData.middle);
		this.tap_replay();
	}
	private tap_advanced() {
		LevelGameDataParse.parseLevelGameData(this._levelConfigData.advanced);
		this.tap_replay();
	}

	private tap_sure() {
		this._menuViewManage.disableTips();
	}
}