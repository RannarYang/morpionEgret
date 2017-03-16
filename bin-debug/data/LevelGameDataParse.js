var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LevelGameDataParse = (function () {
    function LevelGameDataParse() {
    }
    LevelGameDataParse.parseLevelGameData = function (val) {
        GameData.AI = val.AI;
        GameData.undoNum = val.undoNum === -1 ? Number.POSITIVE_INFINITY : val.undoNum;
        GameData.tipsNum = val.tipsNum === -1 ? Number.POSITIVE_INFINITY : val.tipsNum;
    };
    return LevelGameDataParse;
}());
__reflect(LevelGameDataParse.prototype, "LevelGameDataParse");
