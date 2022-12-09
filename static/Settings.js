class Settings {
	static getTitle() {
		return "越前がにロボコン";
	};
	static getGroup(category) {
		return category == "T" ? "エントリー部門" : "歩行部門";
	}
	static getNumberOfMatch(category) {
		return category == "T" ? 8 : 4;
	}
	static getNumberOfStage(category) {
		return category == "T" ? 2 : 1;
	}
	static getPointLabels(){
		return [
			"地球出発 +1",
			"ミルキーウェイ +1",
			"惑星到着 +1",
			"たまごおいた +1",
			"地球帰還 +2",
			"先ゴール",
			"レアメタル +1",
			"レアメタル +1",
			"レアメタル +1",
			"激レアメタル +1",
			"激レアメタル +1",
			"激レアメタル +1",
		];
	}

}

export { Settings };
