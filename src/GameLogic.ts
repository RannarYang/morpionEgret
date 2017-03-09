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
		console.log(levelConfigData);
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
	}

	private move_pawn(evt) {
		if(this._isOver) return;
		let {numX, numY} = evt;
		if (GameData.chessBoard[numX][numY] === 0) {
			this.oneStep(numX, numY, true);
			GameData.chessBoard[numX][numY] = 1;
		}
		for (var k = 0; k < GameData.count; k++) {
			if(GameData.wins[numX][numY][k]) {
				GameData.myWin[k]++;
				GameData.computerWin[k] = 6;
				if(GameData.myWin[k] == 5) {
					window.alert("你赢了");
					this._isOver = true;
				}
			}
		}

		if(!this._isOver) {
			this._me = !this._me;
			this.computerAI();
		}
	}

	private oneStep(i, j, me) {
		 
		this._chessView.addChess(i, j, me);
	}

	private computerAI() {
		var myScore = [];
		var computerScore = [];
		var max = 0;
		var u = 0, v = 0;
		for(var i = 0; i < 15; i++) {
			myScore[i] = [];
			computerScore[i] = [];
			for(var j = 0; j < 15; j++) {
				myScore[i][j] = 0;
				computerScore[i][j] = 0;
			}
		}
		for(var i = 0; i < 15; i++) {
			for(var j = 0; j < 15; j++) {
				if(GameData.chessBoard[i][j] === 0) {
					for(var k = 0; k < GameData.count; k++) {
						if(GameData.wins[i][j][k]) {
							if(GameData.myWin[k] === 1) {
								myScore[i][j] += 200;
							} else if(GameData.myWin[k] === 2) {
								myScore[i][j] += 400;
							} else if (GameData.myWin[k] === 3) {
								myScore[i][j] += 2000;
							} else if(GameData.myWin[k] === 4) {
								myScore[i][j] += 10000;
							}

							if(GameData.computerWin[k] === 1) {
								computerScore[i][j] += 220;
							} else if(GameData.computerWin[k] === 2) {
								computerScore[i][j] += 420;
							} else if (GameData.computerWin[k] === 3) {
								computerScore[i][j] += 2100;
							} else if(GameData.computerWin[k] === 4) {
								computerScore[i][j] += 20000;
							}
						}
					}
					if(myScore[i][j] > max) {
						max = myScore[i][j];
						u = i;
						v = j;
					} else if (myScore[i][j] === max) {
						if(computerScore[i][j] > computerScore[u][v]) {
							u = i;
							v = j;
						}
					}

					if(computerScore[i][j] > max) {
						max = computerScore[i][j];
						u = i;
						v = j;
					} else if (computerScore[i][j] === max) {
						if(myScore[i][j] > myScore[u][v]) {
							u = i;
							v = j;
						}
					}

				}
			}
		}
		this.oneStep(u,v, false);
		GameData.chessBoard[u][v] = 2;
		for (var k = 0; k < GameData.count; k++) {
			if(GameData.wins[u][v][k]) {
				GameData.computerWin[k]++;
				GameData.myWin[k] = 6;
				if(GameData.computerWin[k] == 5) {
					window.alert("计算机赢了");
					this._isOver = true;
				}
			}
		}

		if(!this._isOver) {
			this._me = !this._me;
		}
	}
}