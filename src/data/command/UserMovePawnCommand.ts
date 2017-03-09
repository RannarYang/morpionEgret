class UserMovePawnCommand extends Command {
	private _numX: number;
	private _numY: number;
	private _me: boolean;
	private _chessView: ChessView;
	public constructor(numX: number, numY: number, me: boolean, chessView: ChessView) {
		super();
		this._numX = numX;
		this._numY = numY;
		this._me = me;
		this._chessView = chessView;
	}
	public execute():boolean {
		let isOver = false;
		let numX = this._numX;
		let numY = this._numY;
		
		this._chessView.addChess(numX, numY, true);
		GameData.chessBoard[numX][numY] = 1;
		
		for (var k = 0; k < GameData.count; k++) {
			if(GameData.wins[numX][numY][k]) {
				GameData.myWin[k]++;
				GameData.computerWin[k] += 6;
				if(GameData.myWin[k] == 5) {
					window.alert("你赢了");
					isOver = true;
				}
			}
		}
		return isOver;
	}

	// 做相反的工作
	public undo() {

		let numX = this._numX;
		let numY = this._numY;
		if (GameData.chessBoard[numX][numY] === 1) {
			this._chessView.removeChess();
			GameData.chessBoard[numX][numY] = 0;
		}
		for (var k = 0; k < GameData.count; k++) {
			if(GameData.wins[numX][numY][k]) {
				GameData.myWin[k]--;
				GameData.computerWin[k] -= 6;
			}
		}
	}
}