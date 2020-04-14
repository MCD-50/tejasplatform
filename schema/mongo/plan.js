const mongoose = require("mongoose");

// helper utils
import factory from "../../app/helper/factory";

const schema = {
	name: { // account identifier
		type: String,
		required: true,
	},
	price: {
		type: Number,
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
	factory.addInstance("plan", app.mongoClient.model("plans", _schema));
};

export default initSchema;