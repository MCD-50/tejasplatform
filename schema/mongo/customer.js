const mongoose = require("mongoose");

// helper utils
import factory from "../../app/helper/factory";

const schema = {
	customerId: {
		unique: true,
		type: String,
		required: true,
	},
	userId: {
		unique: true,
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
		default: "user",
		enum: ["user", "admin"]
	},

	name: {
		type: String,
		default: "",
	},
	mobile: {
		type: String,
		default: "",
	},
	email: {
		type: String,
		default: "",
	},
	amount: {
		type: String,
		default: "",
	},
	location: {
		type: String,
		default: "",
	},
	handler: {
		type: String,
		default: "",
	},
	start: {
		type: Date,
		default: Date.now
	},
	end: {
		type: Date,
		default: Date.now
	},
	
	limit: {
		type: Number,
		default: 0
	},
	allowed: {
		type: String,
		default: "",
	},
	freeze: {
		type: Boolean,
		default: false,
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
	factory.addInstance("customer", app.mongoClient.model("customers", _schema));
};

export default initSchema;