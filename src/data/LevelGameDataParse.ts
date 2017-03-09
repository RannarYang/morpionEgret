class LevelGameDataParse {
	public static parseLevelGameData(val:any) {
		GameData.AI = val.AI;
		GameData.undoNum = val.undoNum;
		GameData.hintNum = val.hintNum;
	}
}