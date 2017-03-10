class LevelGameDataParse {
	public static parseLevelGameData(val:any) {
		GameData.AI = val.AI;
		GameData.undoNum = val.undoNum === -1 ? Number.POSITIVE_INFINITY : val.undoNum;
		GameData.tipsNum = val.tipsNum === -1 ? Number.POSITIVE_INFINITY : val.tipsNum;
	}
}