class PropView extends ButtonView {
	private _numText: egret.Bitmap;
	private _num: number = 0; // 道具的数量
	public constructor(name) {
		super(name);
	}
	public get num() : number {
		return this._num;
	}
	public set num(val: number) {
		this._num = val;
		if(val > 0) {
			this.setActiveState(val, true);
		}  else if(val === 0) {
			this.setActiveState(val, false);
		} else{
			this.setActiveState(-1, true);
		}
	}
	public disable() {
		super.disable();
		this.setActiveState(this._num, false);
	}
	public enable() {
		if (this._num > 0 || this._num === -1) {
			super.enable();
			this.setActiveState(this._num, true);
		}
	}
	protected init() {
		this.createView();
		this.createNumText();
	}

	private createNumText() {
		this._numText = new egret.Bitmap();
		this._numText.x = 90;
		this._numText.y = -20;
		this.addChild(this._numText);
	}

	private setActiveState(num: number,val: boolean) {
		this.touchEnabled = val;
		if (val) {
			this._view.texture = RES.getRes(this._activeTexture);
			this._numText.texture = RES.getRes("num" + num + "_png");
		} else {
			this._view.texture = RES.getRes(this._disableTexture);
			this._numText.texture = RES.getRes("num" + num + "_disable_png");
		}
	}
}