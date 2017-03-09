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
        var myScore = [];
        var computerScore = [];
        var max = 0;
        var u = 0, v = 0;
        for (var i = 0; i < 15; i++) {
            myScore[i] = [];
            computerScore[i] = [];
            for (var j = 0; j < 15; j++) {
                myScore[i][j] = 0;
                computerScore[i][j] = 0;
            }
        }
        for (var i = 0; i < 15; i++) {
            for (var j = 0; j < 15; j++) {
                if (GameData.chessBoard[i][j] === 0) {
                    for (var k = 0; k < GameData.count; k++) {
                        if (GameData.wins[i][j][k]) {
                            if (GameData.myWin[k] === 1) {
                                myScore[i][j] += 200;
                            }
                            else if (GameData.myWin[k] === 2) {
                                myScore[i][j] += 400;
                            }
                            else if (GameData.myWin[k] === 3) {
                                myScore[i][j] += 2000;
                            }
                            else if (GameData.myWin[k] === 4) {
                                myScore[i][j] += 10000;
                            }
                            if (GameData.computerWin[k] === 1) {
                                computerScore[i][j] += 220;
                            }
                            else if (GameData.computerWin[k] === 2) {
                                computerScore[i][j] += 420;
                            }
                            else if (GameData.computerWin[k] === 3) {
                                computerScore[i][j] += 2100;
                            }
                            else if (GameData.computerWin[k] === 4) {
                                computerScore[i][j] += 20000;
                            }
                        }
                    }
                    if (myScore[i][j] > max) {
                        max = myScore[i][j];
                        u = i;
                        v = j;
                    }
                    else if (myScore[i][j] === max) {
                        if (computerScore[i][j] > computerScore[u][v]) {
                            u = i;
                            v = j;
                        }
                    }
                    if (computerScore[i][j] > max) {
                        max = computerScore[i][j];
                        u = i;
                        v = j;
                    }
                    else if (computerScore[i][j] === max) {
                        if (myScore[i][j] > myScore[u][v]) {
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
        for (var k = 0; k < GameData.count; k++) {
            if (GameData.wins[u][v][k]) {
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
