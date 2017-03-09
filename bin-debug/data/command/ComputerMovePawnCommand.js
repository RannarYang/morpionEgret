var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ComputerMovePawnCommand = (function (_super) {
    __extends(ComputerMovePawnCommand, _super);
    function ComputerMovePawnCommand(chessView) {
        var _this = _super.call(this) || this;
        _this._chessView = chessView;
        return _this;
    }
    ComputerMovePawnCommand.prototype.execute = function () {
        var _isOver = false;
        var _a = GameData.getNextStep('computer'), numX = _a.numX, numY = _a.numY;
        this._chessView.addChess(numX, numY, false);
        this._numX = numX;
        this._numY = numY;
        GameData.chessBoard[numX][numY] = 2;
        for (var k = 0; k < GameData.count; k++) {
            if (GameData.wins[numX][numY][k]) {
                GameData.computerWin[k]++;
                GameData.myWin[k] += 6;
                if (GameData.computerWin[k] == 5) {
                    window.alert("计算机赢了");
                    _isOver = true;
                }
            }
        }
        return _isOver;
    };
    ComputerMovePawnCommand.prototype.undo = function () {
        var u = this._numX;
        var v = this._numY;
        this._chessView.removeChess();
        GameData.chessBoard[u][v] = 0;
        for (var k = 0; k < GameData.count; k++) {
            if (GameData.wins[u][v][k]) {
                GameData.computerWin[k]--;
                GameData.myWin[k] -= 6;
            }
        }
    };
    return ComputerMovePawnCommand;
}(Command));
__reflect(ComputerMovePawnCommand.prototype, "ComputerMovePawnCommand");
