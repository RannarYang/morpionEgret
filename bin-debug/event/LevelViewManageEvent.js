var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LevelViewManageEvent = (function (_super) {
    __extends(LevelViewManageEvent, _super);
    function LevelViewManageEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, type, bubbles, cancelable) || this;
    }
    return LevelViewManageEvent;
}(egret.Event));
LevelViewManageEvent.TAP_PRIMARY = "tap_primary";
LevelViewManageEvent.TAP_MIDDLE = "tap_middle";
LevelViewManageEvent.TAP_ADVANCED = "tap_advanced";
__reflect(LevelViewManageEvent.prototype, "LevelViewManageEvent");
