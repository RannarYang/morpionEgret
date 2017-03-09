class GameEndView extends egret.EventDispatcher{
	private _layer: egret.Sprite;
	private _resultBitmap: egret.Bitmap;
	private _youWinBitmap: egret.Bitmap;
	public constructor(layer) {
		super();
		this._layer = layer;
		this.init();
		this.hide();
	}
	public show(isWin) {
		if(isWin) {
			this._resultBitmap.texture = RES.getRes("youwin_png");
		} else {
			this._resultBitmap.texture = RES.getRes("gameover_png");
		}
		this._layer.visible = true;
	}
	public hide() {
		this._layer.visible = false;
	}
	private init() {
		let myShape: egret.Shape = new egret.Shape();
		myShape.touchEnabled = true;
		// cover
		myShape.graphics.beginFill(0x000000, 0.7);
		myShape.graphics.drawRect(0, 0, GameData.stageW, GameData.stageH);
		myShape.graphics.endFill();
		// bg
		myShape.graphics.beginFill(0xffffff, 1);
		myShape.graphics.drawRoundRect(50, 240, 500, 300, 50, 50);
		this._layer.addChild(myShape);
		// texture
		let resultBitMap = this._resultBitmap = new egret.Bitmap();
		resultBitMap.x = 50;
		resultBitMap.y = 270;
		this._layer.addChild(this._resultBitmap);

		// btn
		this.initSureBtn();	
	}
	private initSureBtn() {
		let sureBtn = new ButtonView('sure');
		sureBtn.x = 240;
		sureBtn.y = 450;
		this._layer.addChild(sureBtn);
		sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_sure, this);
	}
	private tap_sure() {
		this.hide();
		var evt:GameEndViewEvent = new GameEndViewEvent(GameEndViewEvent.TAP_SURE);
		this.dispatchEvent(evt);
	}
}