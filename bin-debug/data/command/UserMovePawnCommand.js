var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UserMovePawnCommand = (function () {
    function UserMovePawnCommand(numX, numY, me, chessView) {
        this._numX = numX;
        this._numY = numY;
        this._me = me;
        this._chessView = chessView;
    }
    UserMovePawnCommand.prototype.execute = function () {
        var isOver = false;
        var numX = this._numX;
        var numY = this._numY;
        this._chessView.addChess(numX, numY, true);
        GameData.chessBoard[numX][numY] = 1;
        for (var k = 0; k < GameData.count; k++) {
            if (GameData.wins[numX][numY][k]) {
                GameData.myWin[k]++;
                GameData.computerWin[k] += 6;
                if (GameData.myWin[k] == 5) {
                    isOver = true;
                }
            }
        }
        return isOver;
    };
    // 做相反的工作
    UserMovePawnCommand.prototype.undo = function () {
        var numX = this._numX;
        var numY = this._numY;
        if (GameData.chessBoard[numX][numY] === 1) {
            this._chessView.removeChess();
            GameData.chessBoard[numX][numY] = 0;
        }
        for (var k = 0; k < GameData.count; k++) {
            if (GameData.wins[numX][numY][k]) {
                GameData.myWin[k]--;
                GameData.computerWin[k] -= 6;
            }
        }
    };
    return UserMovePawnCommand;
}());
__reflect(UserMovePawnCommand.prototype, "UserMovePawnCommand", ["Command"]);
