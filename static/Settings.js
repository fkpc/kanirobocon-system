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
}

export { Settings };
