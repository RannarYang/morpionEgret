var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MovePawnCommand = (function () {
    function MovePawnCommand(numX, numY) {
        this._numX = numX;
        this._numY = numY;
    }
    MovePawnCommand.prototype.execute = function () {
    };
    MovePawnCommand.prototype.undo = function () {
    };
    return MovePawnCommand;
}());
__reflect(MovePawnCommand.prototype, "MovePawnCommand");
