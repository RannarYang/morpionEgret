var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChessBoardView = (function (_super) {
    __extends(ChessBoardView, _super);
    function ChessBoardView(layer) {
        var _this = _super.call(this) || this;
        _this._layer = layer;
        _this.init();
        return _this;
    }
    ChessBoardView.prototype.init = function () {
        var myShape = new egret.Shape();
        // myShape.y = 30;
        myShape.graphics.beginFill(0xd86525, 1);
        myShape.graphics.drawRect(0, 0, GameData.stageW, GameData.stageH);
        myShape.graphics.endFill();
        myShape.graphics.lineStyle(2, 0xBFBFBF, 1);
        for (var i = 0; i < 15; i++) {
            myShape.graphics.moveTo(20 + i * 40, 20 + 30);
            myShape.graphics.lineTo(20 + i * 40, 580 + 30);
            myShape.graphics.endFill();
            myShape.graphics.moveTo(20, 20 + i * 40 + 30);
            myShape.graphics.lineTo(580, 20 + i * 40 + 30);
            myShape.graphics.endFill();
        }
        this._layer.addChild(myShape);
        myShape.touchEnabled = true;
        myShape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
    };
    ChessBoardView.prototype.tap = function (e) {
        var evt = new ChessBoardViewEvent(ChessBoardViewEvent.MOVE_PAWN);
        evt.numX = Math.floor(e.stageX / 40);
        evt.numY = Math.floor((e.stageY - 30) / 40);
        this.dispatchEvent(evt);
    };
    return ChessBoardView;
}(egret.EventDispatcher));
__reflect(ChessBoardView.prototype, "ChessBoardView");
