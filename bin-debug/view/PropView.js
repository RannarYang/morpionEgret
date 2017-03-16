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
        return _super.call(this, name) || this;
    }
    Object.defineProperty(PropView.prototype, "num", {
        get: function () {
            return this._num;
        },
        set: function (val) {
            this._num = val;
            if (val > 0) {
                this.setActiveState(val, true);
            }
            else {
                this.setActiveState(val, false);
            }
        },
        enumerable: true,
        configurable: true
    });
    PropView.prototype.disable = function () {
        _super.prototype.disable.call(this);
        this.setActiveState(this._num, false);
    };
    PropView.prototype.enable = function () {
        if (this._num > 0) {
            _super.prototype.enable.call(this);
            this.setActiveState(this._num, true);
        }
    };
    PropView.prototype.init = function () {
        this.createView();
        this.createNumText();
    };
    PropView.prototype.createNumText = function () {
        this._numText = new egret.Bitmap();
        this._numText.x = 90;
        this._numText.y = -20;
        this.addChild(this._numText);
    };
    PropView.prototype.setActiveState = function (num, val) {
        this.touchEnabled = val;
        if (val) {
            this._view.texture = RES.getRes(this._activeTexture);
            this._numText.texture = RES.getRes("num" + num + "_png");
        }
        else {
            this._view.texture = RES.getRes(this._disableTexture);
            this._numText.texture = RES.getRes("num" + num + "_disable_png");
        }
    };
    return PropView;
}(ButtonView));
__reflect(PropView.prototype, "PropView");
