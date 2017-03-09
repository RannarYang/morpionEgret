class ChessView extends egret.Sprite{
	private myShapes: egret.Shape[];
	private tipShape: egret.Shape;
	public constructor() {
		super();
		this.myShapes = [];
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
		this.myShapes.push(myShape);
		this.addChild(myShape);
	}
	public removeChess() {
		this.removeTipChess(); // 如果之前有提示，则删除提示功能
		let myShape = this.myShapes.pop();
		this.removeChild(myShape);
	}
	public addTipChess(i, j) {
		if (!this.tipShape) {
			let tipShape = this.tipShape = new egret.Shape();
			var rx = 20 + i * 40;
			var ry = 30 + 20 + j * 40;
			tipShape.graphics.beginFill(0xff0000, 0.5);
			tipShape.graphics.drawCircle(rx,ry,10);
			tipShape.graphics.endFill();
			this.addChild(tipShape);
		}
	}
	public removeTipChess() {
		if (this.tipShape) {
			this.removeChild(this.tipShape);
			this.tipShape = null;
		}
	}
}