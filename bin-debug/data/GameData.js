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
        GameData.count = count;
        GameData.stageW = egret.MainContext.instance.stage.stageWidth;
        GameData.stageH = egret.MainContext.instance.stage.stageHeight;
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
GameData.movePawnCommands = [];
GameData.row = 15;
GameData.col = 15;
GameData.stageW = 0;
GameData.stageH = 0;
__reflect(GameData.prototype, "GameData");
