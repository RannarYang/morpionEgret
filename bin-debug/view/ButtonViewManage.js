var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ButtonViewManage = (function (_super) {
    __extends(ButtonViewManage, _super);
    function ButtonViewManage(layer) {
        var _this = _super.call(this) || this;
        _this._buttonArr = [];
        _this._layer = layer;
        _this.init();
        return _this;
    }
    ButtonViewManage.prototype.init = function () {
        this.initUndoProp();
        this.initTipsProp();
        this.initReplayBtn();
        this.initLevelBtn();
        // 布局
        var len = this._buttonArr.length;
        for (var i = 0; i < len; i++) {
            var btn = this._buttonArr[i];
            btn.x = 24 + (24 + btn.width) * i;
            btn.y = 640;
        }
    };
    ButtonViewManage.prototype.initUndoProp = function () {
        var undoProp = this._undoProp = new PropView('undo');
        this._layer.addChild(undoProp);
        this._buttonArr.push(undoProp);
        undoProp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_undo, this);
    };
    ButtonViewManage.prototype.initTipsProp = function () {
        var tipsProp = this._tipsProp = new PropView('tips');
        this._layer.addChild(tipsProp);
        this._buttonArr.push(tipsProp);
        tipsProp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_tips, this);
    };
    ButtonViewManage.prototype.initReplayBtn = function () {
        var replayBtn = this._replayBtn = new ButtonView('replay');
        this._layer.addChild(replayBtn);
        this._buttonArr.push(replayBtn);
        replayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_replay, this);
    };
    ButtonViewManage.prototype.initLevelBtn = function () {
        var levelBtn = this._levelBtn = new ButtonView('level');
        this._layer.addChild(levelBtn);
        this._buttonArr.push(levelBtn);
        levelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_level, this);
    };
    ButtonViewManage.prototype.tap_undo = function () {
        var evt = new ButtonViewManageEvent(ButtonViewManageEvent.TAP_UNDO);
        this.dispatchEvent(evt);
    };
    ButtonViewManage.prototype.tap_tips = function () {
        var evt = new ButtonViewManageEvent(ButtonViewManageEvent.TAP_TIPS);
        this.dispatchEvent(evt);
    };
    ButtonViewManage.prototype.tap_replay = function () {
        var evt = new ButtonViewManageEvent(ButtonViewManageEvent.TAP_REPLAY);
        this.dispatchEvent(evt);
    };
    ButtonViewManage.prototype.tap_level = function () {
        var evt = new ButtonViewManageEvent(ButtonViewManageEvent.TAP_LEVEL);
        this.dispatchEvent(evt);
    };
    return ButtonViewManage;
}(egret.EventDispatcher));
__reflect(ButtonViewManage.prototype, "ButtonViewManage");
