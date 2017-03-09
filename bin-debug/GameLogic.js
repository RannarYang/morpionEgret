var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameLogic = (function () {
    function GameLogic(gameStage) {
        this._me = true;
        this._isOver = false;
        this._gameStage = gameStage;
        this.init();
    }
    GameLogic.prototype.init = function () {
        GameData.initData(); // 初始化数据
        var levelConfigData = RES.getRes("levelConfig_json");
        console.log(levelConfigData);
        LevelGameDataParse.parseLevelGameData(levelConfigData.middle);
        // 加入棋盘
        var cbc = new egret.Sprite();
        var chessboard = new ChessBoard(cbc);
        this._gameStage.addChild(cbc);
        // 加入棋子
        var chessView = this._chessView = new ChessView();
        this._gameStage.addChild(chessView);
        // 加入按钮组
        var bvmc = new egret.Sprite();
        this._gameStage.addChild(bvmc);
        this.bvm = new ButtonViewManage(bvmc);
        chessboard.addEventListener(ChessBoardEvent.MOVE_PAWN, this.move_pawn, this);
        this.bvm.addEventListener(ButtonViewManageEvent.TAP_UNDO, this.tap_undo, this);
    };
    GameLogic.prototype.move_pawn = function (evt) {
        if (this._isOver)
            return;
        var numX = evt.numX, numY = evt.numY;
        if (GameData.chessBoard[numX][numY] !== 0)
            return;
        var userMoveCommand = new UserMovePawnCommand(numX, numY, this._me, this._chessView);
        GameData.movePawnCommands.push(userMoveCommand);
        this._isOver = userMoveCommand.execute();
        if (!this._isOver) {
            this._me = !this._me;
            var computerMoveCommand = new ComputerMovePawnCommand(this._chessView);
            GameData.movePawnCommands.push(computerMoveCommand);
            this._isOver = computerMoveCommand.execute();
        }
    };
    GameLogic.prototype.tap_undo = function (evt) {
        for (var i = 0; i < 2; i++) {
            var command = GameData.movePawnCommands.pop();
            command.undo();
        }
    };
    return GameLogic;
}());
__reflect(GameLogic.prototype, "GameLogic");
