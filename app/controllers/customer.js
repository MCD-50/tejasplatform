import joi from "joi";

import * as constant from "../helper/constant";
import * as collection from "../helper/collection";
import * as joiHelper from "../helper/joiHelper";

import api from "../enum/api";

// client
import security from "../client/security";

// repo
import customer from "../repository/customer";

export const login = async (req, res) => {
	try {
		const meta = req.meta;

		const body = req.body || null;

		const joiPayload = body && { ...body, ...collection.resolveDetailFromMeta(meta) } || null;

		let error = null, value = null;
		if (meta.api == api.ADMIN) {
			const inst = joiPayload && joi.validate(joiPayload, joiHelper.LOGIN_ADMIN_CUSTOMER_PAYLOAD) || joiHelper.DEFAULT_JOI_RESPONSE;
			error = inst.error;
			value = inst.value;
		} else if (meta.api == api.USER) {
			const inst = joiPayload && joi.validate(joiPayload, joiHelper.LOGIN_USER_CUSTOMER_PAYLOAD) || joiHelper.DEFAULT_JOI_RESPONSE;
			error = inst.error;
			value = inst.value;
		}

		if (error || !value || (!error && !value)) return res.status(400).json(collection.getJsonError({ error: "Please check payload" }));

		const filter = { userId: value.userId, password: security.hash(value.password) };
		const customerdata = await customer._getItem(filter);
		if (customerdata.error || !customerdata.value) return res.status(422).json(collection.getJsonError({ error: "Invalid user id or password" }));

		const jwtpayload = {
			customerId: customerdata.value.customerId,
			userId: customerdata.value.userId,
			allowed: customerdata.value.allowed,
			limit: customerdata.value.limit
		};

		const authorization = security.jwtEncode(jwtpayload);
		if (!authorization) return res.status(422).json(collection.getJsonError({ error: "Somthing went wrong" }));

		const redKey1 = collection.prepareRedisKey(constant.CUSTOMER_ID_FROM_JWT, collection.prepareRedisKey(req.headers.device, authorization));
		const data = await req.app.redisHelper.set(redKey1);
		if (data.value) {
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
		if (value.limit) payload.limit = value.limit;
		if (value.allowed) payload.allowed = value.allowed;

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
		if (value.type) filter.type = value.type;
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