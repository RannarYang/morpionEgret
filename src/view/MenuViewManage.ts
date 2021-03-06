class MenuViewManage extends egret.EventDispatcher{
	private _layer: egret.Sprite;
	private _undoProp: PropView;
	private _tipsProp: PropView;
	private _replayBtn: ButtonView;
	private _levelBtn: ButtonView;
	private _buttonArr: ButtonView[] = [];

	public constructor(layer: egret.Sprite) {
		super();
		this._layer = layer;
		this.init();
	}
	private disableUndo() {
		this._undoProp.disable();
	}
	public enableUndo() {
		this._undoProp.enable();
	}
	public disableTips() {
		this._tipsProp.disable();
	}
	public enableTips() {
		this._tipsProp.enable();
	}
	public update(pawnLen: number) {
		if(pawnLen > 0) {
			this.enableUndo();
		} else {
			this.disableUndo();
		}
	}
	private init() {
		this.initUndoProp();
		this.initTipsProp();
		this.initReplayBtn();
		this.initLevelBtn();
		// 布局
		let len = this._buttonArr.length;
		for(let i = 0; i < len; i++) {
			let btn = this._buttonArr[i];
			btn.x = 24 + (24 + btn.width) * i;
            btn.y = 630;
		}
		this.initData();
	}
	public initData(){
		this._undoProp.num = GameData.undoNum;
		this._tipsProp.num = GameData.tipsNum;
	}
	private initUndoProp() {
		let undoProp = this._undoProp = new PropView('undo');
		this._layer.addChild(undoProp);
		this.disableUndo();
		this._buttonArr.push(undoProp);
		undoProp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_undo, this);
	}

	private initTipsProp() {
		let tipsProp = this._tipsProp = new PropView('tips');
		this._layer.addChild(tipsProp);
		this._buttonArr.push(tipsProp);
		tipsProp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_tips, this);
	}

	private initReplayBtn() {
		let replayBtn = this._replayBtn = new ButtonView('replay');
		this._layer.addChild(replayBtn);
		this._buttonArr.push(replayBtn);
		replayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_replay, this);
	}

	private initLevelBtn() {
		let levelBtn = this._levelBtn = new ButtonView('level');
		this._layer.addChild(levelBtn);
		this._buttonArr.push(levelBtn);
		levelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_level, this);
	}

	private tap_undo() {
		if(this._undoProp.num !== -1) {
			this._undoProp.num--;
		}
		var evt:MenuViewManageEvent = new MenuViewManageEvent(MenuViewManageEvent.TAP_UNDO);
		this.dispatchEvent(evt);
	}
	private tap_tips() {
		if(this._tipsProp.num !== -1) {
			this._tipsProp.num--;	
		}
		var evt:MenuViewManageEvent = new MenuViewManageEvent(MenuViewManageEvent.TAP_TIPS);
		this.dispatchEvent(evt);
	}
	private tap_replay() {
		var evt:MenuViewManageEvent = new MenuViewManageEvent(MenuViewManageEvent.TAP_REPLAY);
		this.dispatchEvent(evt);
	}
	private tap_level() {
		var evt:MenuViewManageEvent = new MenuViewManageEvent(MenuViewManageEvent.TAP_LEVEL);
		this.dispatchEvent(evt);
	}
}