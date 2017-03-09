class ChessView extends egret.Sprite{
	private myShapes: egret.Shape[];
	public constructor() {
		super();
		this.myShapes = [];
	}
	public addChess(i, j, me) {
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
		let myShape = this.myShapes.pop();
		this.removeChild(myShape);
	}
}