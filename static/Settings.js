class Settings {
	static getTitle() {
		return "Matz葉がにロボコン";
	};
	static getGroup(category) {
		return category == "T" ? "小学生部門" : "オープン部門";
	}
	static getNumberOfMatch(category) {
		return category == "T" ? 8 : 8;
	}
	static getNumberOfStage(category) {
		return category == "T" ? 2 : 1;
	}
}

export { Settings };
