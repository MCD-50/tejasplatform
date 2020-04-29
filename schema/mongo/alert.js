const mongoose = require("mongoose");

// helper utils
import factory from "../../app/helper/factory";

const schema = {
	customerId: {
		type: String,
		required: true,
	},
	market: {
		type: String,
		required: true,
	},
	target: {
		type: String,
		required: true,
	},
	price: {
		type: String,
		required: true,
	},
	trigger: {
		type: String,
		required: true,
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
	factory.addInstance("alert", app.mongoClient.model("alerts", _schema));
};

export default initSchema;