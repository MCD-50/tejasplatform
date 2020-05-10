const mongoose = require("mongoose");

// helper utils
import factory from "../../app/helper/factory";

const schema = {
	title: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	link: {
		type: String,
		required: false,
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
	factory.addInstance("announcement", app.mongoClient.model("announcements", _schema));
};

export default initSchema;