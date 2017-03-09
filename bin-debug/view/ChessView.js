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
        _this.myShape = new egret.Shape();
        _this.addChild(_this.myShape);
        return _this;
    }
    ChessView.prototype.addChess = function (i, j, me) {
        var myShape = this.myShape;
        var rx = 20 + i * 40;
        var ry = 30 + 20 + j * 40;
        //创建渐变填充  
        if (me) {
            // myShape.graphics.beginGradientFill(egret.GradientType.RADIAL,[0x0A0A0A,0x636766],[1,1],[0,1]);//渐变按钮
            myShape.graphics.beginFill(0x000000, 1);
        }
        else {
            // myShape.graphics.beginGradientFill(egret.GradientType.RADIAL,[0xD1D1D1,0xF9F9F9],[1,1],[0,1]);//渐变按钮
            myShape.graphics.beginFill(0xffffff, 1);
        }
        myShape.graphics.drawCircle(rx, ry, 15);
        myShape.graphics.endFill();
    };
    return ChessView;
}(egret.Sprite));
__reflect(ChessView.prototype, "ChessView");
