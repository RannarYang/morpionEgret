class ComputerMovePawnCommand extends Command{
	private _numX;
	private _numY;
	private _chessView: ChessView;
	public constructor(chessView: ChessView) {
		super();
		this._chessView = chessView;
	}
	public execute() {
		let _isOver = false;
		let myScore = [];
		let computerScore = [];
		let max = 0;
		let u = 0, v = 0;
		for(let i = 0; i < 15; i++) {
			myScore[i] = [];
			computerScore[i] = [];
			for(let j = 0; j < 15; j++) {
				myScore[i][j] = 0;
				computerScore[i][j] = 0;
			}
		}
		for(let i = 0; i < 15; i++) {
			for(let j = 0; j < 15; j++) {
				if(GameData.chessBoard[i][j] === 0) {
					for(let k = 0; k < GameData.count; k++) {
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
		this._chessView.addChess(u, v, false);
		this._numX = u;
		this._numY = v;
		GameData.chessBoard[u][v] = 2;
		for (let k = 0; k < GameData.count; k++) {
			if(GameData.wins[u][v][k]) {
				GameData.computerWin[k]++;
				GameData.myWin[k] += 6;
				if(GameData.computerWin[k] == 5) {
					window.alert("计算机赢了");
					_isOver = true;
				}
			}
		}
		return _isOver;
	}
	public undo() {
		let u = this._numX;
		let v = this._numY;
		this._chessView.removeChess();
		GameData.chessBoard[u][v] = 0;
		for (let k = 0; k < GameData.count; k++) {
			if(GameData.wins[u][v][k]) {
				GameData.computerWin[k]--;
				GameData.myWin[k] -= 6;
			}
		}
	}
}