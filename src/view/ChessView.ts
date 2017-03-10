class ChessView extends egret.Sprite{
	private _myShapes: egret.Shape[];
	private _tipShape: egret.Shape;
	public constructor() {
		super();
		this.init();
	}
	public init() {
		this.removeChildren();
		this._myShapes = [];
		this._tipShape = null;
	}
	public addChess(i, j, me) {
		this.removeTipChess();
		let myShape = new egret.Shape();

		var rx = 20 + i * 40;
		var ry = 30 + 20 + j * 40;
		//创建渐变填充  
		
		if (me) {
			myShape.graphics.beginFill(0x000000, 1);
		} else {
			myShape.graphics.beginFill(0xffffff, 1);			
		}
		
		myShape.graphics.drawCircle(rx,ry,15);
		myShape.graphics.endFill();
		this._myShapes.push(myShape);
		this.addChild(myShape);
	}
	public removeChess() {
		this.removeTipChess(); // 如果之前有提示，则删除提示功能
		let myShape = this._myShapes.pop();
		this.removeChild(myShape);
	}
	public addTipChess(i, j) {
		if (!this._tipShape) {
			let tipShape = this._tipShape = new egret.Shape();
			var rx = 20 + i * 40;
			var ry = 30 + 20 + j * 40;
			tipShape.graphics.beginFill(0xff0000, 0.5);
			tipShape.graphics.drawCircle(rx,ry,10);
			tipShape.graphics.endFill();
			this.addChild(tipShape);
		}
	}
	public removeTipChess() {
		if (this._tipShape) {
			this.removeChild(this._tipShape);
			this._tipShape = null;
		}
	}
}