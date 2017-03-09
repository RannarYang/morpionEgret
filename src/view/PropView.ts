class PropView extends ButtonView {
	private _numText: egret.BitmapText;
	private _num: number = 0; // 道具的数量
	public constructor(name) {
		super(name);
	}
	public get num() : number {
		return this._num;
	}
	public set num(val: number) {
		this._num = val;
		this._numText.text = val.toString();
		if(val < 0) {
			this.setActiveState(false);
		} else {
			this.setActiveState(true);
		}
	}
	protected init() {
		this.createView();
		this.createNumText();
	}

	private createNumText() {
		this._numText = new egret.BitmapText();
		this._numText.font = RES.getRes("number_fnt");
		this._numText.x = this._view.width - 31;
		this.addChild(this._numText);
	}

	private setActiveState(val: boolean) {
		this.touchEnabled = val;
		if (val) {
			this._view.texture = RES.getRes(this._activeTexture);
			this._numText.font = RES.getRes("number_fnt");
		} else {
			this._view.texture = RES.getRes(this._disableTexture);
			this._numText.font = RES.getRes("numberdisable_fnt");
		}
	}
}