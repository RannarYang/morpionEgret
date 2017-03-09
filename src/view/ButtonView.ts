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
	public disable() {
		this._view.texture = RES.getRes(this._disableTexture); 
		this._view.touchEnabled = false;
	}
	public enable() {
		this._view.texture = RES.getRes(this._activeTexture); 
		this._view.touchEnabled = true;
	}
	protected init() {
		this.createView();
	}
	protected createView() {
		this._view = new egret.Bitmap();
		this._view.texture = RES.getRes(this._activeTexture);
		this._view.touchEnabled = true;
		this.addChild(this._view);
	}
}