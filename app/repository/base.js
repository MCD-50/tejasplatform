import * as constant from "../helper/constant";

import factory from "../helper/factory";

class Base {
	constructor(database) {
		this.db = factory.resolveInstance(database);
		this.actualDbName = database;
		this.dbName = String(database).toUpperCase();
	}

	_createItem(payload, sessionOptions = null) {
		if (!this.db) this.db = factory.resolveInstance(this.actualDbName);
		sessionOptions = sessionOptions || {};
		return new Promise((resolve) => {
			this.db.create([payload], { ...sessionOptions }, (error, value) => {
				error && console.log(error);
				if (value && value.length > 0) {
					return resolve({ value: value[0] });
				} else {
					return resolve({ error: "Something went wrong." });
				}
			});
		});
	}

	_createItemMulti(payloads) {
		if (!this.db) this.db = factory.resolveInstance(this.actualDbName);
		return new Promise((resolve) => {
			this.db.insertMany(payloads, (error, value) => {
				error && console.log(error);
				if (value) {
					return resolve({ value: true });
				} else {
					return resolve({ error: "Something went wrong." });
				}
			});
		});
	}

	_getItem(filter, keys = constant.DB_FETCH[this.actualDbName]) {
		if (!this.db) this.db = factory.resolveInstance(this.actualDbName);
		return new Promise((resolve) => {
			// we are not performing lean
			this.db.findOne(filter).select(keys).exec((error, value) => {
				error && console.log(error);
				if (value) {
					return resolve({ value: value });
				} else {
					return resolve({ error: "Something went wrong." });
				}
			});
		});
	}

	// eslint-disable-next-line no-unused-vars
	_updateItem(filter, payload, sessionOptions = null) {
		if (!this.db) this.db = factory.resolveInstance(this.actualDbName);
		sessionOptions = sessionOptions || {};
		return new Promise((resolve) => {
			this.db.findOneAndUpdate(filter, payload, { upsert: true }, (error, value) => {
				error && console.log(error);
				if (value) {
					return resolve({ value: value });
				} else {
					return resolve({ error: "Something went wrong." });
				}
			});
		});
	}

	_saveItem(item, sessionOptions = null) {
		if (!this.db) this.db = factory.resolveInstance(this.actualDbName);
		sessionOptions = sessionOptions || {};
		return new Promise((resolve) => {
			item.save({ ...sessionOptions }, (error, value) => {
				error && console.log(error);
				if (value) {
					return resolve({ value: value });
				} else {
					return resolve({ error: "Something went wrong." });
				}
			});
		});
	}

	_deleteItem(filter) {
		if (!this.db) this.db = factory.resolveInstance(this.actualDbName);
		return new Promise((resolve) => {
			this.db.findOneAndDelete(filter, (error, value) => {
				error && console.log(error);
				if (value) {
					return resolve({ value: true });
				} else {
					return resolve({ error: "Something went wrong." });
				}
			});
		});
	}

	_countAll(filter) {
		if (!this.db) this.db = factory.resolveInstance(this.actualDbName);
		return new Promise((resolve) => {
			this.db.count(filter, (error, value) => {
				error && console.log(error);
				if (value != null && value != undefined) {
					return resolve({ value: value });
				} else {
					return resolve({ error: "Something went wrong." });
				}
			});
		});
	}

	// returns results without the paging
	_getAllItem(filter, keys = constant.DB_FETCH[this.actualDbName]) {
		if (!this.db) this.db = factory.resolveInstance(this.actualDbName);
		return new Promise((resolve) => {
			this.db.find(filter).select(keys).lean().exec((error, value) => {
				error && console.log(error);
				if (value) {
					return resolve({ value: value });
				} else {
					return resolve({ error: "Something went wrong." });
				}
			});
		});
	}

	_filterItem(filter, paging = null, keys = constant.DB_FETCH[this.actualDbName]) {
		if (!this.db) this.db = factory.resolveInstance(this.actualDbName);
		if (!paging || !paging.page || !paging.limit) paging = { page: 1, limit: 10, sort: { createdAt: -1 } };
		if (!paging.sort) paging = { ...paging, sort: { createdAt: -1 } };
		return new Promise((resolve) => {
			this.db.paging({ filter, ...paging, keys }, (error, value) => {
				error && console.log(error);
				if (value && value.rows != null) {
					const nvalue = { data: [], count: 0 };
					nvalue.data = value.rows.slice() || [];
					nvalue.count = value.count;
					return resolve({ value: nvalue });
				} else {
					return resolve({ error: "Something went wrong." });
				}
			});
		});
	}
}

export default Base;