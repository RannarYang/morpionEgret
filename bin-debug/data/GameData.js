var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameData = (function () {
    function GameData() {
    }
    GameData.initData = function () {
        // init ChessBoard
        for (var i = 0; i < GameData.row; i++) {
            GameData.chessBoard[i] = [];
            for (var j = 0; j < GameData.row; j++) {
                GameData.chessBoard[i][j] = 0;
            }
        }
        // init wins;
        GameData.wins = new Array();
        for (var i = 0; i < GameData.row; i++) {
            GameData.wins[i] = new Array();
            for (var j = 0; j < GameData.col; j++) {
                GameData.wins[i][j] = new Array();
            }
        }
        // 所有的横线的赢法
        var count = 0;
        for (var i = 0; i < 15; i++) {
            for (var j = 0; j < 11; j++) {
                for (var k = 0; k < 5; k++) {
                    GameData.wins[i][j + k][count] = true;
                }
                count++;
            }
        }
        // 所有的竖线的赢法
        for (var i = 0; i < 15; i++) {
            for (var j = 0; j < 11; j++) {
                for (var k = 0; k < 5; k++) {
                    GameData.wins[j + k][i][count] = true;
                }
                count++;
            }
        }
        // 所有的斜线的赢法
        for (var i = 0; i < 11; i++) {
            for (var j = 0; j < 11; j++) {
                for (var k = 0; k < 5; k++) {
                    GameData.wins[i + k][j + k][count] = true;
                }
                count++;
            }
        }
        // 所有的反斜线的赢法
        for (var i = 0; i < 11; i++) {
            for (var j = 14; j > 3; j--) {
                for (var k = 0; k < 5; k++) {
                    GameData.wins[i + k][j - k][count] = true;
                }
                count++;
            }
        }
        // init myWin & computerWin
        for (var i = 0; i < count; i++) {
            GameData.myWin[i] = 0;
            GameData.computerWin[i] = 0;
        }
        // init count
        GameData.count = count;
        // init movePawnCommands
        this.movePawnCommands = [];
        GameData.stageW = egret.MainContext.instance.stage.stageWidth;
        GameData.stageH = egret.MainContext.instance.stage.stageHeight;
    };
    GameData.getNextStep = function (me) {
        var myWin = [];
        var enemyWin = [];
        if (!me) {
            myWin = GameData.computerWin;
            enemyWin = GameData.myWin;
        }
        else {
            myWin = GameData.myWin;
            enemyWin = GameData.computerWin;
        }
        var enemyScore = [];
        var myScore = [];
        var max = 0;
        var u = 0, v = 0;
        for (var i = 0; i < 15; i++) {
            enemyScore[i] = [];
            myScore[i] = [];
            for (var j = 0; j < 15; j++) {
                enemyScore[i][j] = 0;
                myScore[i][j] = 0;
            }
        }
        for (var i = 0; i < 15; i++) {
            for (var j = 0; j < 15; j++) {
                if (GameData.chessBoard[i][j] === 0) {
                    for (var k = 0; k < GameData.count; k++) {
                        if (GameData.wins[i][j][k]) {
                            if (enemyWin[k] === 1) {
                                enemyScore[i][j] += 200;
                            }
                            else if (enemyWin[k] === 2) {
                                enemyScore[i][j] += 400;
                            }
                            else if (enemyWin[k] === 3) {
                                enemyScore[i][j] += 2000;
                            }
                            else if (enemyWin[k] === 4) {
                                myScore[i][j] += 10000;
                            }
                            if (myWin[k] === 1) {
                                myScore[i][j] += 220;
                            }
                            else if (myWin[k] === 2) {
                                myScore[i][j] += 420;
                            }
                            else if (myWin[k] === 3) {
                                myScore[i][j] += 2100;
                            }
                            else if (myWin[k] === 4) {
                                myScore[i][j] += 20000;
                            }
                        }
                    }
                    if (enemyScore[i][j] > max) {
                        max = enemyScore[i][j];
                        u = i;
                        v = j;
                    }
                    else if (enemyScore[i][j] === max) {
                        if (myScore[i][j] > myScore[u][v]) {
                            u = i;
                            v = j;
                        }
                    }
                    if (myScore[i][j] > max) {
                        max = myScore[i][j];
                        u = i;
                        v = j;
                    }
                    else if (myScore[i][j] === max) {
                        if (enemyScore[i][j] > enemyScore[u][v]) {
                            u = i;
                            v = j;
                        }
                    }
                }
            }
        }
        return {
            numX: u,
            numY: v
        };
    };
    GameData.movePawnCommandsPop = function () {
        var command = this.movePawnCommands.pop();
        this.updateObserver();
        return command;
    };
    GameData.movePawnCommandsPush = function (command) {
        this.movePawnCommands.push(command);
        this.updateObserver();
    };
    GameData.addPawnObserver = function (observer) {
        this._pawnObservers.push(observer);
    };
    GameData.updateObserver = function () {
        for (var i = 0; i < this._pawnObservers.length; i++) {
            this._pawnObservers[i].update(this.movePawnCommands.length);
        }
    };
    return GameData;
}());
GameData.AI = "AI1";
GameData.undoNum = 0;
GameData.hintNum = 0;
GameData.chessBoard = [];
GameData.myWin = [];
GameData.computerWin = [];
GameData.count = 0;
GameData.row = 15;
GameData.col = 15;
GameData.stageW = 0;
GameData.stageH = 0;
GameData._pawnObservers = [];
__reflect(GameData.prototype, "GameData");
