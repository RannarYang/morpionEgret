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
        LevelGameDataParse.parseLevelGameData(this._levelConfigData.primary); // 默认是初级的
        // 加入棋盘
        var cbvs = new egret.Sprite();
        var chessBoardView = new ChessBoardView(cbvs);
        this._gameStage.addChild(cbvs);
        // 加入棋子
        var chessView = this._chessView = new ChessView();
        this._gameStage.addChild(chessView);
        // 加入按钮组
        var mvms = new egret.Sprite();
        this._gameStage.addChild(mvms);
        this._menuViewManage = new MenuViewManage(mvms);
        GameData.addPawnObserver(this._menuViewManage);
        // 加入关卡选择
        var lvms = new egret.Sprite();
        this._gameStage.addChild(lvms);
        this._leveViewManage = new LevelViewManage(lvms);
        this._leveViewManage.hide();
        var gevv = new egret.Sprite();
        this._gameStage.addChild(gevv);
        this._gameEndView = new GameEndView(gevv);
        chessBoardView.addEventListener(ChessBoardViewEvent.MOVE_PAWN, this.move_pawn, this);
        this._menuViewManage.addEventListener(MenuViewManageEvent.TAP_UNDO, this.tap_undo, this);
        this._menuViewManage.addEventListener(MenuViewManageEvent.TAP_TIPS, this.tap_tips, this);
        this._menuViewManage.addEventListener(MenuViewManageEvent.TAP_REPLAY, this.tap_replay, this);
        this._menuViewManage.addEventListener(MenuViewManageEvent.TAP_LEVEL, this.tap_level, this);
        this._leveViewManage.addEventListener(LevelViewManageEvent.TAP_PRIMARY, this.tap_primary, this);
        this._leveViewManage.addEventListener(LevelViewManageEvent.TAP_MIDDLE, this.tap_middle, this);
        this._leveViewManage.addEventListener(LevelViewManageEvent.TAP_ADVANCED, this.tap_advanced, this);
        this._gameEndView.addEventListener(GameEndViewEvent.TAP_SURE, this.tap_sure, this);
    };
    GameLogic.prototype.initData = function () {
        this._me = true;
        this._isOver = false;
    };
    GameLogic.prototype.move_pawn = function (evt) {
        if (this._isOver)
            return;
        var numX = evt.numX, numY = evt.numY;
        if (GameData.chessBoard[numX][numY] !== 0)
            return;
        var userMoveCommand = new UserMovePawnCommand(numX, numY, this._me, this._chessView);
        GameData.movePawnCommandsPush(userMoveCommand);
        this._isOver = userMoveCommand.execute();
        if (this._isOver) {
            // GameEnd 
            this._gameEndView.show(true);
        }
        else {
            this._me = !this._me;
            var computerMoveCommand = new ComputerMovePawnCommand(this._chessView);
            GameData.movePawnCommandsPush(computerMoveCommand);
            this._isOver = computerMoveCommand.execute();
            if (this._isOver) {
                // GameEnd 
                this._gameEndView.show(false);
            }
        }
    };
    GameLogic.prototype.tap_undo = function (evt) {
        var undoTime = (GameData.movePawnCommandsLen() % 2) === 0 ? 2 : 1;
        for (var i = 0; i < undoTime; i++) {
            var command = GameData.movePawnCommandsPop();
            command.undo();
        }
        this._me = true;
        this._isOver = false;
        this._menuViewManage.enableTips();
    };
    GameLogic.prototype.tap_tips = function (evt) {
        var _a = GameData.getNextStep(true), numX = _a.numX, numY = _a.numY;
        this._chessView.addTipChess(numX, numY);
    };
    GameLogic.prototype.tap_replay = function () {
        GameData.initData();
        this.initData();
        this._menuViewManage.initData();
        this._chessView.init();
    };
    GameLogic.prototype.tap_level = function () {
        this._leveViewManage.show();
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
    GameLogic.prototype.tap_sure = function () {
        this._menuViewManage.disableTips();
    };
    return GameLogic;
}());
__reflect(GameLogic.prototype, "GameLogic");
