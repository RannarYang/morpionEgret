var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ButtonView = (function (_super) {
    __extends(ButtonView, _super);
    function ButtonView(name) {
        var _this = _super.call(this) || this;
        _this._name = "";
        _this._activeTexture = "";
        _this._disableTexture = "";
        _this._name = name;
        var buttonConfig = RES.getRes("buttonConfig_json");
        _this._activeTexture = buttonConfig[name].activeTexture;
        _this._disableTexture = buttonConfig[name].disableTexture;
        _this.init();
        return _this;
    }
    ButtonView.prototype.disable = function () {
        this._view.texture = RES.getRes(this._disableTexture);
        this._view.touchEnabled = false;
    };
    ButtonView.prototype.enable = function () {
        this._view.texture = RES.getRes(this._activeTexture);
        this._view.touchEnabled = true;
    };
    ButtonView.prototype.init = function () {
        this.createView();
    };
    ButtonView.prototype.createView = function () {
        this._view = new egret.Bitmap();
        this._view.texture = RES.getRes(this._activeTexture);
        this._view.touchEnabled = true;
        this.addChild(this._view);
    };
    return ButtonView;
}(egret.Sprite));
__reflect(ButtonView.prototype, "ButtonView");
