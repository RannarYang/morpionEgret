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
		let {numX, numY} = GameData.getNextStep('computer');
		this._chessView.addChess(numX, numY, false);
		this._numX = numX;
		this._numY = numY;
		GameData.chessBoard[numX][numY] = 2;
		for (let k = 0; k < GameData.count; k++) {
			if(GameData.wins[numX][numY][k]) {
				GameData.computerWin[k]++;
				GameData.myWin[k] += 6;
				if(GameData.computerWin[k] == 5) {
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