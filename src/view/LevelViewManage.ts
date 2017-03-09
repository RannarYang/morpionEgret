class LevelViewManage extends egret.EventDispatcher{
	private _layer: egret.Sprite;
	private _buttonArr: ButtonView[] = [];
	private _primaryBtn: ButtonView;
	private _middleBtn: ButtonView;
	private _advancedBtn: ButtonView;
	public constructor(layer) {
		super();
		this._layer = layer;
		this.init();
	}
	public show() {
		this._layer.visible = true;
	}
	public hide() {
		this._layer.visible = false;
	}
	private init() {
		// draw level background
		this.addLevelBackground();
		this.initPrimaryBtn();
		this.initMiddleBtn();
		this.initAdvancedBtn();
		this.addCloseBtn();
		// 布局
		let len = this._buttonArr.length;
		for(let i = 0; i < len; i++) {
			let btn = this._buttonArr[i];
			btn.x = (GameData.stageW - 120) / 2;
            btn.y = 260 + (40 + btn.height) * i;
		}
	}
	private addLevelBackground() {
		let myShape: egret.Shape = new egret.Shape();
		myShape.touchEnabled = true;
		// cover
		myShape.graphics.beginFill(0x000000, 0.7);
		myShape.graphics.drawRect(0, 0, GameData.stageW, GameData.stageH);
		myShape.graphics.endFill();
		// bg
		myShape.graphics.beginFill(0xffffff, 1);
		myShape.graphics.drawRoundRect(175, 220, 250, 320, 50, 50);
		this._layer.addChild(myShape);
	}
	private initPrimaryBtn() {
		let primaryBtn = this._primaryBtn = new ButtonView('primary');
		this._layer.addChild(primaryBtn);
		this._buttonArr.push(primaryBtn);
		primaryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_primary, this);
	}
	private initMiddleBtn() {
		let middleBtn = this._middleBtn = new ButtonView('middle');
		this._layer.addChild(middleBtn);
		this._buttonArr.push(middleBtn);
		middleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_middle, this);
	}

	private initAdvancedBtn() {
		let advancedBtn = this._advancedBtn = new ButtonView('advanced');
		this._layer.addChild(advancedBtn);
		this._buttonArr.push(advancedBtn);
		advancedBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_advanced, this);
	}
	private addCloseBtn() {
		let closeBtn = new egret.Bitmap();
		closeBtn.texture = RES.getRes('close_png');
		closeBtn.x = 395;
		closeBtn.y = 205;
		closeBtn.touchEnabled = true;
		this._layer.addChild(closeBtn);
		closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_close, this);
	}
	private tap_primary() {
		this.hide();
		var evt:ButtonViewManageEvent = new ButtonViewManageEvent(LevelViewManageEvent.TAP_PRIMARY);
		this.dispatchEvent(evt)
	}
	private tap_middle() {
		this.hide();
		var evt:ButtonViewManageEvent = new ButtonViewManageEvent(LevelViewManageEvent.TAP_MIDDLE);
		this.dispatchEvent(evt)
	}
	private tap_advanced() {
		this.hide();
		var evt:ButtonViewManageEvent = new ButtonViewManageEvent(LevelViewManageEvent.TAP_ADVANCED);
		this.dispatchEvent(evt)
	}
	private tap_close() {
		this.hide();
	}
}