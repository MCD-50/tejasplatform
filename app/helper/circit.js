class Circit {
	constructor() {
		this.change_map = {};
	}

	set_change_map(key, value) {
		this.change_map[key] = value;
	}

	get_change_map(key) {
		return this.change_map[key] || "";
	}
}

const circit = new Circit();
export default circit;