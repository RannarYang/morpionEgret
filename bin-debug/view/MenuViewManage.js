var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MenuViewManage = (function (_super) {
    __extends(MenuViewManage, _super);
    function MenuViewManage(layer) {
        var _this = _super.call(this) || this;
        _this._buttonArr = [];
        _this._layer = layer;
        _this.init();
        return _this;
    }
    MenuViewManage.prototype.disableUndo = function () {
        this._undoProp.disable();
    };
    MenuViewManage.prototype.enableUndo = function () {
        this._undoProp.enable();
    };
    MenuViewManage.prototype.disableTips = function () {
        this._tipsProp.disable();
    };
    MenuViewManage.prototype.enableTips = function () {
        this._tipsProp.enable();
    };
    MenuViewManage.prototype.update = function (pawnLen) {
        if (pawnLen > 0) {
            this.enableUndo();
        }
        else {
            this.disableUndo();
        }
    };
    MenuViewManage.prototype.init = function () {
        this.initUndoProp();
        this.initTipsProp();
        this.initReplayBtn();
        this.initLevelBtn();
        // 布局
        var len = this._buttonArr.length;
        for (var i = 0; i < len; i++) {
            var btn = this._buttonArr[i];
            btn.x = 24 + (24 + btn.width) * i;
            btn.y = 630;
        }
        this.initData();
    };
    MenuViewManage.prototype.initData = function () {
        this._undoProp.num = GameData.undoNum;
        this._tipsProp.num = GameData.tipsNum;
    };
    MenuViewManage.prototype.initUndoProp = function () {
        var undoProp = this._undoProp = new PropView('undo');
        this._layer.addChild(undoProp);
        this.disableUndo();
        this._buttonArr.push(undoProp);
        undoProp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_undo, this);
    };
    MenuViewManage.prototype.initTipsProp = function () {
        var tipsProp = this._tipsProp = new PropView('tips');
        this._layer.addChild(tipsProp);
        this._buttonArr.push(tipsProp);
        tipsProp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_tips, this);
    };
    MenuViewManage.prototype.initReplayBtn = function () {
        var replayBtn = this._replayBtn = new ButtonView('replay');
        this._layer.addChild(replayBtn);
        this._buttonArr.push(replayBtn);
        replayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_replay, this);
    };
    MenuViewManage.prototype.initLevelBtn = function () {
        var levelBtn = this._levelBtn = new ButtonView('level');
        this._layer.addChild(levelBtn);
        this._buttonArr.push(levelBtn);
        levelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_level, this);
    };
    MenuViewManage.prototype.tap_undo = function () {
        if (this._undoProp.num !== -1) {
            this._undoProp.num--;
        }
        var evt = new MenuViewManageEvent(MenuViewManageEvent.TAP_UNDO);
        this.dispatchEvent(evt);
    };
    MenuViewManage.prototype.tap_tips = function () {
        if (this._tipsProp.num !== -1) {
            this._tipsProp.num--;
        }
        var evt = new MenuViewManageEvent(MenuViewManageEvent.TAP_TIPS);
        this.dispatchEvent(evt);
    };
    MenuViewManage.prototype.tap_replay = function () {
        var evt = new MenuViewManageEvent(MenuViewManageEvent.TAP_REPLAY);
        this.dispatchEvent(evt);
    };
    MenuViewManage.prototype.tap_level = function () {
        var evt = new MenuViewManageEvent(MenuViewManageEvent.TAP_LEVEL);
        this.dispatchEvent(evt);
    };
    return MenuViewManage;
}(egret.EventDispatcher));
__reflect(MenuViewManage.prototype, "MenuViewManage");
