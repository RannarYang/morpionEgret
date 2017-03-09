class GameEndViewEvent extends egret.Event{
	public static TAP_SURE: string = "tap_sure";
	public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false){
        super(type,bubbles,cancelable);
    }
}