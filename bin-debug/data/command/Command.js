var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Command = (function () {
    function Command() {
    }
    Command.prototype.execute = function () {
    };
    Command.prototype.undo = function () {
    };
    return Command;
}());
__reflect(Command.prototype, "Command");
