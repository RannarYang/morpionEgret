class MenuViewManageEvent extends egret.Event{
	public static TAP_UNDO: string = "tap_undo";
	public static TAP_TIPS: string = "tap_tips";
	public static TAP_REPLAY: string = "tap_replay";
	public static TAP_LEVEL: string = "tap_level";
	public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false){
        super(type,bubbles,cancelable);
    }
}