class ButtonView extends egret.Sprite {
	protected _view: egret.Bitmap;
	protected _name: string = "";
	protected _activeTexture: string = "";
	protected _disableTexture: string = "";

	public constructor(name) {
		super();
		this._name = name;
		let buttonConfig = RES.getRes("buttonConfig_json");
		this._activeTexture = buttonConfig[name].activeTexture;
		this._disableTexture = buttonConfig[name].disableTexture;
		this.init();
	}
	protected init() {
		this.createView();
	}
	protected createView() {
		this._view = new egret.Bitmap();
		this._view.texture = RES.getRes(this._activeTexture);
		this.addChild(this._view);
	}
}