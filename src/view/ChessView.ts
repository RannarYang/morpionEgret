class ChessView extends egret.Sprite{
	private myShape: egret.Shape;
	public constructor() {
		super();
		this.myShape = new egret.Shape();
		this.addChild(this.myShape);
	}
	public addChess(i, j, me) {
		let myShape = this.myShape; 

		var rx = 20 + i * 40;
		var ry = 30 + 20 + j * 40;
		//创建渐变填充  
		

		if (me) {
			// myShape.graphics.beginGradientFill(egret.GradientType.RADIAL,[0x0A0A0A,0x636766],[1,1],[0,1]);//渐变按钮
			myShape.graphics.beginFill(0x000000, 1);
		} else {
			// myShape.graphics.beginGradientFill(egret.GradientType.RADIAL,[0xD1D1D1,0xF9F9F9],[1,1],[0,1]);//渐变按钮
			myShape.graphics.beginFill(0xffffff, 1);			
		}
		
		myShape.graphics.drawCircle(rx,ry,15);
		myShape.graphics.endFill();
	}
}