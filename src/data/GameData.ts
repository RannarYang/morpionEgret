class GameData {
	public static AI : string = "AI1";
	public static undoNum : number = 0;
	public static hintNum : number = 0;

	public static chessBoard : number[][] = [];
	public static wins : boolean[][][];
	public static myWin : number[] = [];
	public static computerWin : number[] = [];
	public static count : number = 0;

	public static movePawnCommands : Command[] = [];
	public static row: number = 15;
	public static col: number = 15;

	public static stageW: number = 0;
	public static stageH: number = 0;
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
		GameData.count = count;
		GameData.stageW = egret.MainContext.instance.stage.stageWidth;
		GameData.stageH = egret.MainContext.instance.stage.stageHeight;
	}
}