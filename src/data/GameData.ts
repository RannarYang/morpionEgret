class GameData {
	public static AI : string = "AI1";
	public static undoNum : number = 0;
	public static tipsNum : number = 0;

	public static chessBoard : number[][] = [];
	public static wins : boolean[][][];
	public static myWin : number[] = [];
	public static computerWin : number[] = [];
	public static count : number = 0;

	private static movePawnCommands : Command[];
	public static row: number = 15;
	public static col: number = 15;

	public static stageW: number = 0;
	public static stageH: number = 0;

	private static _pawnObservers = [];
	public static initData() {
		// init ChessBoard
		for (let i = 0; i < GameData.row; i++) {
			GameData.chessBoard[i] = [];
			for (let j = 0; j < GameData.row; j++) {
				GameData.chessBoard[i][j] = 0;
			}
		}
		// init wins;
		GameData.wins = new Array();
		for (let i = 0; i < GameData.row; i++) {
			GameData.wins[i] = new Array();
			for (let j = 0; j < GameData.col; j++) {
				GameData.wins[i][j] = new Array();
			}
		}

		// 所有的横线的赢法
		let count = 0;
		for(let i = 0; i < 15; i++) {
			for(let j = 0; j < 11; j++) {
				for(let k = 0; k < 5; k++) {
					GameData.wins[i][j+k][count] = true;
				}
				count++;
			}
		}
		// 所有的竖线的赢法
		for(let i = 0; i < 15; i++) {
			for(let j = 0; j < 11; j++) {
				for(let k = 0; k < 5; k++) {
					GameData.wins[j+k][i][count] = true;
				}
				count++;
			}
		}
		// 所有的斜线的赢法
		for(let i = 0; i < 11; i++) {
			for(let j = 0; j < 11; j++) {
				for(let k = 0; k < 5; k++) {
					GameData.wins[i+k][j+k][count] = true;
				}
				count++;
			}
		}
		// 所有的反斜线的赢法
		for(let i = 0; i < 11; i++) {
			for(let j = 14; j > 3; j--) {
				for(let k = 0; k < 5; k++) {
					GameData.wins[i+k][j-k][count] = true;
				}
				count++;
			}
		}

		// init myWin & computerWin
		for(let i = 0; i < count; i++) {
			GameData.myWin[i] = 0;
			GameData.computerWin[i] = 0;
		}
		// init count
		GameData.count = count;
		// init movePawnCommands
		this.movePawnCommands = [];
		GameData.stageW = egret.MainContext.instance.stage.stageWidth;
		GameData.stageH = egret.MainContext.instance.stage.stageHeight;
	}
	public static getNextStep(me) {
		let myWin = [];
		let enemyWin = [];
		if(!me) { // computer 调用的情况下
			myWin = GameData.computerWin;
			enemyWin = GameData.myWin;
		} else { // 自己调用的情况下
			myWin = GameData.myWin;
			enemyWin = GameData.computerWin;
		}
		let enemyScore = [];
		let myScore = [];
		let max = 0;
		let u = 0, v = 0;
		for(let i = 0; i < 15; i++) {
			enemyScore[i] = [];
			myScore[i] = [];
			for(let j = 0; j < 15; j++) {
				enemyScore[i][j] = 0;
				myScore[i][j] = 0;
			}
		}
		for(let i = 0; i < 15; i++) {
			for(let j = 0; j < 15; j++) {
				if(GameData.chessBoard[i][j] === 0) {
					for(let k = 0; k < GameData.count; k++) {
						if(GameData.wins[i][j][k]) {
							if(enemyWin[k] === 1) {
								enemyScore[i][j] += 200;
							} else if(enemyWin[k] === 2) {
								enemyScore[i][j] += 400;
							} else if (enemyWin[k] === 3) {
								enemyScore[i][j] += 2000;
							} else if(enemyWin[k] === 4) {
								myScore[i][j] += 10000;
							}

							if(myWin[k] === 1) {
								myScore[i][j] += 220;
							} else if(myWin[k] === 2) {
								myScore[i][j] += 420;
							} else if (myWin[k] === 3) {
								myScore[i][j] += 2100;
							} else if(myWin[k] === 4) {
								myScore[i][j] += 20000;
							}
						}
					}
					if(enemyScore[i][j] > max) {
						max = enemyScore[i][j];
						u = i;
						v = j;
					} else if (enemyScore[i][j] === max) {
						if(myScore[i][j] > myScore[u][v]) {
							u = i;
							v = j;
						}
					}

					if(myScore[i][j] > max) {
						max = myScore[i][j];
						u = i;
						v = j;
					} else if (myScore[i][j] === max) {
						if(enemyScore[i][j] > enemyScore[u][v]) {
							u = i;
							v = j;
						}
					}

				}
			}
		}
		return {
			numX : u,
			numY : v
		}
	}
	public static movePawnCommandsPop() {
		let command = this.movePawnCommands.pop();
		this.updateObserver();
		return command;
	}
	public static movePawnCommandsPush(command: Command) {
		this.movePawnCommands.push(command);
		this.updateObserver();
	}
	public static movePawnCommandsLen() {
		return this.movePawnCommands.length;
	}
	public static addPawnObserver(observer) {
		this._pawnObservers.push(observer);
	}
	private static updateObserver() {
		for(let i = 0; i < this._pawnObservers.length; i++) {
			this._pawnObservers[i].update(this.movePawnCommands.length);
		}
	}
}