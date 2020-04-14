import joi from "joi";

import * as constant from "../helper/constant";
import * as collection from "../helper/collection";
import * as joiHelper from "../helper/joiHelper";

import api from "../enum/api";

// client
import security from "../client/security";

// repo
import customer from "../repository/customer";
import actiity from "../repository/activity";

export const login = async (req, res) => {
	try {
		const body = req.body || null;

		const joiPayload = body && { ...body } || null;
		let { error, value } = joiPayload && joi.validate(joiPayload, joiHelper.LOGIN_PAYLOAD) || joiHelper.DEFAULT_JOI_RESPONSE;
		if (error || !value || (!error && !value)) return res.status(400).json(collection.getJsonError({ error: "Please check payload" }));

		const filter = { userId: value.userId, password: security.hash(value.password) };
		if (value.customerId) filter.customerId = value.customerId;

		const customerdata = await customer._getItem(filter);
		if (customerdata.error || !customerdata.value || customerdata.value.freeze) return res.status(422).json(collection.getJsonError({ error: "Invalid user id or password" }));

		const jwtpayload = {
			customerId: customerdata.value.customerId,
			userId: customerdata.value.userId,
			start: customerdata.value.start,
			end: customerdata.value.end,
			allowed: customerdata.value.allowed,
			limit: customerdata.value.limit,
			type: customerdata.value.type,
			freeze: customerdata.value.freeze,
		};

		const authorization = security.jwtEncode(jwtpayload);
		if (!authorization) return res.status(422).json(collection.getJsonError({ error: "Somthing went wrong" }));

		const redKey1 = collection.prepareRedisKey(constant.CUSTOMER_ID_FROM_JWT, collection.prepareRedisKey(req.headers.device, authorization));
		const data = await req.app.redisHelper.set(redKey1, customerdata.value.customerId);
		if (data.value) {

			// call the activity creation
			const activityPayload = {
				customerId: customerdata.value.customerId,
				ipAddress: req.headers["cf-connecting-ip"] || req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || req.ip || "unidentified",
				device: req.headers["device"] || "unidentified",
			};

			// create in background
			actiity._createItem(activityPayload);

			req.app.redisHelper.expire(redKey1, collection.parseEnvValue(process.env.REDIS_TOKEN_EXPIRE));
			return res.status(200).json(collection.getJsonResponse({ result: { ...jwtpayload, authorization } }));
		} else {
			return res.status(422).json(collection.getJsonError({ error: "Somthing went wrong" }));
		}
	} catch (exe) {
		return res.status(400).json(collection.getJsonError({ error: "Somthing went wrong" }));
	}
};

export const logout = async (req, res) => {
	try {
		const redKey1 = collection.prepareRedisKey(constant.CUSTOMER_ID_FROM_JWT, collection.prepareRedisKey(req.headers.device, req.headers.authorization));
		const data = await req.app.redisHelper.del(redKey1);
		if (data.value) {
			return res.status(200).json(collection.getJsonResponse({ result: true }));
		} else {
			return res.status(422).json(collection.getJsonError({ error: "Somthing went wrong" }));
		}
	} catch (exe) {
		return res.status(400).json(collection.getJsonError({ error: "Somthing went wrong" }));
	}
};

export const customers_update = async (req, res) => {
	try {
		const meta = req.meta;

		const body = req.body || null;
		const params = req.params || null;

		const joiPayload = body && params && { ...body, ...params, ...collection.resolveDetailFromMeta(meta) } || null;

		let error = null, value = null;
		if (meta.api == api.ADMIN) {
			const inst = joiPayload && joi.validate(joiPayload, joiHelper.UPDATE_ADMIN_CUSTOMER_PAYLOAD) || joiHelper.DEFAULT_JOI_RESPONSE;
			error = inst.error;
			value = inst.value;
		}

		if (error || !value || (!error && !value)) return res.status(400).json(collection.getJsonError({ error: "Please check payload" }));

		const payload = {};
		if (value.password) payload.password = security.hash(value.password);

		if (value.name) payload.name = value.name;
		if (value.mobile) payload.mobile = value.mobile;
		if (value.email) payload.email = value.email;
		if (value.amount) payload.amount = value.amount;
		if (value.location) payload.location = value.location;
		if (value.handler) payload.handler = value.handler;
		if (value.start) payload.start = value.start;
		if (value.end) payload.end = value.end;

		if (value.limit) payload.limit = value.limit;
		if (value.allowed) payload.allowed = value.allowed;
		if (value.freeze != null) payload.freeze = value.freeze;

		if (Object.keys(payload).length < 1) return res.status(422).json(collection.getJsonError({ error: "Somthing went wrong" }));

		const filter = { customerId: value.customerId };
		const data = await customer._updateItem(filter, payload);
		if (data.value) {
			return res.status(200).json(collection.getJsonResponse({ result: data.value }));
		} else {
			return res.status(422).json(collection.getJsonError({ error: "Somthing went wrong" }));
		}
	} catch (exe) {
		return res.status(400).json(collection.getJsonError({ error: "Somthing went wrong" }));
	}
};

export const customers_changepassword = async (req, res) => {
	try {
		const meta = req.meta;

		const body = req.body || null;
		const params = req.params || null;

		const joiPayload = body && params && { ...body, ...params, ...collection.resolveDetailFromMeta(meta) } || null;

		let error = null, value = null;
		if (meta.api == api.USER) {
			const inst = joiPayload && joi.validate(joiPayload, joiHelper.CHANGE_PASSWORD_USER_CUSTOMER_PAYLOAD) || joiHelper.DEFAULT_JOI_RESPONSE;
			error = inst.error;
			value = inst.value;
		}

		if (error || !value || (!error && !value)) return res.status(400).json(collection.getJsonError({ error: "Please check payload" }));

		const payload = { password: security.hash(value.newpassword) };
		const filter = { customerId: value.customerId, password: security.hash(value.oldpassword) };

		const data = await customer._updateItem(filter, payload);
		if (data.value) {
			return res.status(200).json(collection.getJsonResponse({ result: data.value }));
		} else {
			return res.status(422).json(collection.getJsonError({ error: "Somthing went wrong" }));
		}
	} catch (exe) {
		return res.status(400).json(collection.getJsonError({ error: "Somthing went wrong" }));
	}
};

export const customers_get = async (req, res) => {
	try {
		const meta = req.meta;

		const params = req.params || null;

		const joiPayload = params && { ...params, ...collection.resolveDetailFromMeta(meta) } || null;

		let error = null, value = null;
		if (meta.api == api.ADMIN) {
			const inst = joiPayload && joi.validate(joiPayload, joiHelper.GET_ADMIN_CUSTOMER_PAYLOAD) || joiHelper.DEFAULT_JOI_RESPONSE;
			error = inst.error;
			value = inst.value;
		} else if (meta.api == api.USER) {
			const inst = joiPayload && joi.validate(joiPayload, joiHelper.GET_USER_CUSTOMER_PAYLOAD) || joiHelper.DEFAULT_JOI_RESPONSE;
			error = inst.error;
			value = inst.value;
		}

		if (error || !value || (!error && !value)) return res.status(400).json(collection.getJsonError({ error: "Please check payload" }));

		const filter = { customerId: value.customerId };
		const data = await customer._getItem(filter);
		if (data.value) {
			return res.status(200).json(collection.getJsonResponse({ result: data.value }));
		} else {
			return res.status(422).json(collection.getJsonError({ error: "Somthing went wrong" }));
		}
	} catch (exe) {
		return res.status(400).json(collection.getJsonError({ error: "Somthing went wrong" }));
	}
};

export const customers = async (req, res) => {
	try {
		const meta = req.meta;

		const query = req.query || null;

		const joiPayload = query && { ...query, ...collection.resolveDetailFromMeta(meta) } || null;

		let error = null, value = null;
		if (meta.api == api.ADMIN) {
			const inst = joiPayload && joi.validate(joiPayload, joiHelper.GET_ADMIN_CUSTOMERS_PAYLOAD) || joiHelper.DEFAULT_JOI_RESPONSE;
			error = inst.error;
			value = inst.value;
		}

		if (error || !value || (!error && !value)) return res.status(400).json(collection.getJsonError({ error: "Please check payload" }));

		const filter = {};
		if (value.customerId) filter.customerId = value.customerId;
		if (value.userId) filter.userId = value.userId;
		if (value.type) filter.type = value.type;
		if (value.location) filter.location = value.location;
		if (value.handler) filter.handler = value.handler;

		const paging = { page: value.page, limit: value.limit };

		const data = await customer._filterItem(filter, paging);
		if (data.value) {
			return res.status(200).json(collection.getJsonResponse({ result: data.value }));
		} else {
			return res.status(422).json(collection.getJsonError({ error: "Somthing went wrong" }));
		}
	} catch (exe) {
		return res.status(400).json(collection.getJsonError({ error: "Somthing went wrong" }));
	}
};