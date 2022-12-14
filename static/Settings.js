class Settings {
	static getTitle() {
		return "越前がにロボコン";
	};
	static getGroup(category) {
		return {
            "T" : "エントリー部門",
            "K" : "歩行部門",
            "O" : "オープン部門",
        }[category];
	}
	static getNumberOfMatch(category) {
		return {
            "T" : 8,
            "K" : 8,
            "O" : 4,
        }[category];
	}
    static getNumOfYosenStages() {
        return 3;
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
