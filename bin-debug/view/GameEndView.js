var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameEndView = (function (_super) {
    __extends(GameEndView, _super);
    function GameEndView(layer) {
        var _this = _super.call(this) || this;
        _this._layer = layer;
        _this.init();
        _this.hide();
        return _this;
    }
    GameEndView.prototype.show = function (isWin) {
        if (isWin) {
            this._resultBitmap.texture = RES.getRes("youwin_png");
        }
        else {
            this._resultBitmap.texture = RES.getRes("gameover_png");
        }
        this._layer.visible = true;
    };
    GameEndView.prototype.hide = function () {
        this._layer.visible = false;
    };
    GameEndView.prototype.init = function () {
        var myShape = new egret.Shape();
        myShape.touchEnabled = true;
        // cover
        myShape.graphics.beginFill(0x000000, 0.7);
        myShape.graphics.drawRect(0, 0, GameData.stageW, GameData.stageH);
        myShape.graphics.endFill();
        // bg
        myShape.graphics.beginFill(0xffffff, 1);
        myShape.graphics.drawRoundRect(50, 240, 500, 300, 50, 50);
        this._layer.addChild(myShape);
        // texture
        var resultBitMap = this._resultBitmap = new egret.Bitmap();
        resultBitMap.x = 50;
        resultBitMap.y = 270;
        this._layer.addChild(this._resultBitmap);
        // btn
        this.initSureBtn();
    };
    GameEndView.prototype.initSureBtn = function () {
        var sureBtn = new ButtonView('sure');
        sureBtn.x = 240;
        sureBtn.y = 450;
        this._layer.addChild(sureBtn);
        sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_sure, this);
    };
    GameEndView.prototype.tap_sure = function () {
        this.hide();
        var evt = new GameEndViewEvent(GameEndViewEvent.TAP_SURE);
        this.dispatchEvent(evt);
    };
    return GameEndView;
}(egret.EventDispatcher));
__reflect(GameEndView.prototype, "GameEndView");
