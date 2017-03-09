var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LevelViewManage = (function (_super) {
    __extends(LevelViewManage, _super);
    function LevelViewManage(layer) {
        var _this = _super.call(this) || this;
        _this._buttonArr = [];
        _this._layer = layer;
        _this.init();
        return _this;
    }
    LevelViewManage.prototype.show = function () {
        this._layer.visible = true;
    };
    LevelViewManage.prototype.hide = function () {
        this._layer.visible = false;
    };
    LevelViewManage.prototype.init = function () {
        // draw level background
        this.addLevelBackground();
        this.initPrimaryBtn();
        this.initMiddleBtn();
        this.initAdvancedBtn();
        this.addCloseBtn();
        // 布局
        var len = this._buttonArr.length;
        for (var i = 0; i < len; i++) {
            var btn = this._buttonArr[i];
            btn.x = (GameData.stageW - 120) / 2;
            btn.y = 260 + (40 + btn.height) * i;
        }
    };
    LevelViewManage.prototype.addLevelBackground = function () {
        var myShape = new egret.Shape();
        myShape.touchEnabled = true;
        // cover
        myShape.graphics.beginFill(0x000000, 0.7);
        myShape.graphics.drawRect(0, 0, GameData.stageW, GameData.stageH);
        myShape.graphics.endFill();
        // bg
        myShape.graphics.beginFill(0xffffff, 1);
        myShape.graphics.drawRoundRect(175, 220, 250, 320, 50, 50);
        this._layer.addChild(myShape);
    };
    LevelViewManage.prototype.initPrimaryBtn = function () {
        var primaryBtn = this._primaryBtn = new ButtonView('primary');
        this._layer.addChild(primaryBtn);
        this._buttonArr.push(primaryBtn);
        primaryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_primary, this);
    };
    LevelViewManage.prototype.initMiddleBtn = function () {
        var middleBtn = this._middleBtn = new ButtonView('middle');
        this._layer.addChild(middleBtn);
        this._buttonArr.push(middleBtn);
        middleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_middle, this);
    };
    LevelViewManage.prototype.initAdvancedBtn = function () {
        var advancedBtn = this._advancedBtn = new ButtonView('advanced');
        this._layer.addChild(advancedBtn);
        this._buttonArr.push(advancedBtn);
        advancedBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_advanced, this);
    };
    LevelViewManage.prototype.addCloseBtn = function () {
        var closeBtn = new egret.Bitmap();
        closeBtn.texture = RES.getRes('close_png');
        closeBtn.x = 395;
        closeBtn.y = 205;
        closeBtn.touchEnabled = true;
        this._layer.addChild(closeBtn);
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_close, this);
    };
    LevelViewManage.prototype.tap_primary = function () {
        this.hide();
        var evt = new ButtonViewManageEvent(LevelViewManageEvent.TAP_PRIMARY);
        this.dispatchEvent(evt);
    };
    LevelViewManage.prototype.tap_middle = function () {
        this.hide();
        var evt = new ButtonViewManageEvent(LevelViewManageEvent.TAP_MIDDLE);
        this.dispatchEvent(evt);
    };
    LevelViewManage.prototype.tap_advanced = function () {
        this.hide();
        var evt = new ButtonViewManageEvent(LevelViewManageEvent.TAP_ADVANCED);
        this.dispatchEvent(evt);
    };
    LevelViewManage.prototype.tap_close = function () {
        this.hide();
    };
    return LevelViewManage;
}(egret.EventDispatcher));
__reflect(LevelViewManage.prototype, "LevelViewManage");
