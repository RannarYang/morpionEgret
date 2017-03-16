class LevelViewManageEvent extends egret.Event{
	public static TAP_PRIMARY: string = "tap_primary";
	public static TAP_MIDDLE: string = "tap_middle";
	public static TAP_ADVANCED: string = "tap_advanced";
	public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false){
        super(type,bubbles,cancelable);
    }
}