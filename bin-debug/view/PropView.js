var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PropView = (function (_super) {
    __extends(PropView, _super);
    function PropView(name) {
        var _this = _super.call(this, name) || this;
        _this._num = 0; // 道具的数量
        return _this;
    }
    Object.defineProperty(PropView.prototype, "num", {
        get: function () {
            return this._num;
        },
        set: function (val) {
            this._num = val;
            this._numText.text = val.toString();
            if (val < 0) {
                this.setActiveState(false);
            }
            else {
                this.setActiveState(true);
            }
        },
        enumerable: true,
        configurable: true
    });
    PropView.prototype.init = function () {
        this.createView();
        this.createNumText();
    };
    PropView.prototype.createNumText = function () {
        this._numText = new egret.BitmapText();
        this._numText.font = RES.getRes("number_fnt");
        this._numText.x = this._view.width - 31;
        this.addChild(this._numText);
    };
    PropView.prototype.setActiveState = function (val) {
        this.touchEnabled = val;
        if (val) {
            this._view.texture = RES.getRes(this._activeTexture);
            this._numText.font = RES.getRes("number_fnt");
        }
        else {
            this._view.texture = RES.getRes(this._disableTexture);
            this._numText.font = RES.getRes("numberdisable_fnt");
        }
    };
    return PropView;
}(ButtonView));
__reflect(PropView.prototype, "PropView");
