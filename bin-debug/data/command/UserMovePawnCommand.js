var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UserMovePawnCommand = (function (_super) {
    __extends(UserMovePawnCommand, _super);
    function UserMovePawnCommand(numX, numY, me, chessView) {
        var _this = _super.call(this) || this;
        _this._numX = numX;
        _this._numY = numY;
        _this._me = me;
        _this._chessView = chessView;
        return _this;
    }
    UserMovePawnCommand.prototype.execute = function () {
        var isOver = false;
        var numX = this._numX;
        var numY = this._numY;
        if (GameData.chessBoard[numX][numY] === 0) {
            this._chessView.addChess(numX, numY, true);
            GameData.chessBoard[numX][numY] = 1;
        }
        for (var k = 0; k < GameData.count; k++) {
            if (GameData.wins[numX][numY][k]) {
                GameData.myWin[k]++;
                GameData.computerWin[k] += 6;
                if (GameData.myWin[k] == 5) {
                    window.alert("你赢了");
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
}(Command));
__reflect(UserMovePawnCommand.prototype, "UserMovePawnCommand");
