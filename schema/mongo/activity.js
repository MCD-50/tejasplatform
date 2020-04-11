const mongoose = require("mongoose");

import factory from "../../app/helper/factory";

const schema = {
	customerId: {
		type: String,
		required: true,
	},
	ipAddress: { // account identifier
		type: String,
		required: true,
	},
	device: {
		type: String,
		default: "",
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
};

const initSchema = (app) => {
	const _schema = new mongoose.Schema(schema);
	// setup plugins
	_schema.plugin(require("./plugins/paging"));
	// setup indexes
	_schema.index({ customerId: 1 });
	factory.addInstance("activity", app.mongoClient.model("activities", _schema));
};

export default initSchema;