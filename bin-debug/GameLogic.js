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
        var levelConfigData = this._levelConfigData = RES.getRes("levelConfig_json");
        LevelGameDataParse.parseLevelGameData(this._levelConfigData.primary);
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
        // 加入关卡选择
        var levelc = new egret.Sprite();
        this._gameStage.addChild(levelc);
        this.lvm = new LevelViewManage(levelc);
        chessboard.addEventListener(ChessBoardEvent.MOVE_PAWN, this.move_pawn, this);
        this.bvm.addEventListener(ButtonViewManageEvent.TAP_UNDO, this.tap_undo, this);
        this.bvm.addEventListener(ButtonViewManageEvent.TAP_TIPS, this.tap_tips, this);
        this.bvm.addEventListener(ButtonViewManageEvent.TAP_REPLAY, this.tap_replay, this);
        this.bvm.addEventListener(ButtonViewManageEvent.TAP_LEVEL, this.tap_level, this);
        this.lvm.addEventListener(LevelViewManageEvent.TAP_PRIMARY, this.tap_primary, this);
        this.lvm.addEventListener(LevelViewManageEvent.TAP_MIDDLE, this.tap_middle, this);
        this.lvm.addEventListener(LevelViewManageEvent.TAP_ADVANCED, this.tap_advanced, this);
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
    GameLogic.prototype.tap_tips = function (evt) {
        var _a = GameData.getNextStep(true), numX = _a.numX, numY = _a.numY;
        this._chessView.addTipChess(numX, numY);
    };
    GameLogic.prototype.tap_replay = function () {
        GameData.initData();
        this._chessView.init();
    };
    GameLogic.prototype.tap_level = function () {
        this.lvm.show();
    };
    GameLogic.prototype.tap_primary = function () {
        LevelGameDataParse.parseLevelGameData(this._levelConfigData.primary);
        this.tap_replay();
    };
    GameLogic.prototype.tap_middle = function () {
        LevelGameDataParse.parseLevelGameData(this._levelConfigData.middle);
        this.tap_replay();
    };
    GameLogic.prototype.tap_advanced = function () {
        LevelGameDataParse.parseLevelGameData(this._levelConfigData.advanced);
        this.tap_replay();
    };
    return GameLogic;
}());
__reflect(GameLogic.prototype, "GameLogic");
