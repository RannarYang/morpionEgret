class ChessBoard extends egret.EventDispatcher {
	private _layer: egret.Sprite;
	public constructor(layer: egret.Sprite) {
		super();
		this._layer = layer;
		this.init();
	}
	private init() {

		let myShape: egret.Shape = new egret.Shape();
		myShape.y = 30;
		myShape.graphics.beginFill(0xd86525, 1);
		myShape.graphics.drawRect(0, 0, GameData.stageW, GameData.stageH);
		myShape.graphics.endFill();
		myShape.graphics.lineStyle(2, 0xBFBFBF, 1);
		
		for (var i = 0; i < 15; i++) {
			myShape.graphics.moveTo(20 + i * 40, 20);
			myShape.graphics.lineTo(20 + i * 40, 580);
			myShape.graphics.endFill();

			myShape.graphics.moveTo(20, 20 + i * 40);
			myShape.graphics.lineTo(580, 20 + i * 40);
			myShape.graphics.endFill()
		}
		this._layer.addChild(myShape);
		myShape.touchEnabled = true;
		myShape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
	}
	private tap(e: egret.TouchEvent) {
		let evt: ChessBoardEvent = new ChessBoardEvent(ChessBoardEvent.MOVE_PAWN);
		evt.numX = Math.floor(e.stageX / 40);
		evt.numY = Math.floor((e.stageY - 30) / 40);
		this.dispatchEvent(evt);
	}
}