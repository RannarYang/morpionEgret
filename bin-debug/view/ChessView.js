var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChessView = (function (_super) {
    __extends(ChessView, _super);
    function ChessView() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    ChessView.prototype.init = function () {
        this.removeChildren();
        this.myShapes = [];
        this.tipShape = null;
    };
    ChessView.prototype.addChess = function (i, j, me) {
        this.removeTipChess();
        var myShape = new egret.Shape();
        var rx = 20 + i * 40;
        var ry = 30 + 20 + j * 40;
        //创建渐变填充  
        if (me) {
            myShape.graphics.beginFill(0x000000, 1);
        }
        else {
            myShape.graphics.beginFill(0xffffff, 1);
        }
        myShape.graphics.drawCircle(rx, ry, 15);
        myShape.graphics.endFill();
        this.myShapes.push(myShape);
        this.addChild(myShape);
    };
    ChessView.prototype.removeChess = function () {
        this.removeTipChess(); // 如果之前有提示，则删除提示功能
        var myShape = this.myShapes.pop();
        this.removeChild(myShape);
    };
    ChessView.prototype.addTipChess = function (i, j) {
        if (!this.tipShape) {
            var tipShape = this.tipShape = new egret.Shape();
            var rx = 20 + i * 40;
            var ry = 30 + 20 + j * 40;
            tipShape.graphics.beginFill(0xff0000, 0.5);
            tipShape.graphics.drawCircle(rx, ry, 10);
            tipShape.graphics.endFill();
            this.addChild(tipShape);
        }
    };
    ChessView.prototype.removeTipChess = function () {
        if (this.tipShape) {
            this.removeChild(this.tipShape);
            this.tipShape = null;
        }
    };
    return ChessView;
}(egret.Sprite));
__reflect(ChessView.prototype, "ChessView");
