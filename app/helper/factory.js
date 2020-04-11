class Factory {
	constructor() {
		this.factory = {};
	}

	addInstance(key, instance) {
		this.factory[key] = instance;
	}

	removeInstance(key) {
		delete this.factory[key];
	}

	resolveInstance(key) {
		return this.factory[key];
	}
}

// init app factory
const factory = new Factory();
export default factory;
