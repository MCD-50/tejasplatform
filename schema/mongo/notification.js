const mongoose = require("mongoose");

// helper utils
import factory from "../../app/helper/factory";

const schema = {
	customerId: {
		type: String,
		required: true,
	},
	title: { // account identifier
		type: String,
		required: true,
	},
	message: {
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
	factory.addInstance("notification", app.mongoClient.model("notifications", _schema));
};

export default initSchema;