class Circit {
	constructor() {
		this.pairs = new Set();
		this.change_map = {};
	}

	set_pairs(key) {
		this.pairs.add(key);
	}

	set_change_map(key, value) {
		this.change_map[key] = value;
	}

	get_pairs() {
		return Array.from(this.pairs);
	}

	get_change_map(key) {
		return this.change_map[key] || "";
	}
}

const circit = new Circit();
export default circit;