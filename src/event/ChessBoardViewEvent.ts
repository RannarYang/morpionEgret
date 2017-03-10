class ChessBoardViewEvent extends egret.Event{
	public static MOVE_PAWN: string = "move_pawn";
	public numX : number = 0;
	public numY : number = 0;
	public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false){
        super(type,bubbles,cancelable);
    }
}