var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Chess = (function () {
    function Chess(numX, numY) {
        this.numX = 0;
        this.numY = 0;
        this.numX = numX;
        this.numY = numY;
    }
    return Chess;
}());
__reflect(Chess.prototype, "Chess");
