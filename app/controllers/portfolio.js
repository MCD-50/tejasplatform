import joi from "joi";

import * as collection from "../helper/collection";
import * as joiHelper from "../helper/joiHelper";

import api from "../enum/api";

// repo
import portfolio from "../repository/portfolio";
import customer from "../repository/customer";

export const portfolios_create = async (req, res) => {
	try {
		const meta = req.meta;

		const body = req.body || null;
		const params = req.params || null;

		const joiPayload = body && params && { ...body, ...params, ...collection.resolveDetailFromMeta(meta) } || null;
		const { error, value } = joiPayload && joi.validate(joiPayload, joiHelper.CREATE_USER_PORTFOLIO_PAYLOAD) || joiHelper.DEFAULT_JOI_RESPONSE;
		if (error || !value || (!error && !value)) return res.status(400).json(collection.getJsonError({ error: "Please check payload" }));

		// before adding check the allowed limit and existing limit
		const customerfilter = { customerId: value.customerId };
		const customerdata = await customer._getItem(customerfilter);
		if (customerdata.error || !customerdata.value) return res.status(422).json(collection.getJsonError({ error: "Something went wrong" }));

		const countfilter = { customerId: value.customerId };
		const countdata = await portfolio._countAll(countfilter);
		if (countdata.error || countdata.value == null) return res.status(422).json(collection.getJsonError({ error: "Something went wrong" }));

		if (!customerdata.value.limit || Number(customerdata.value.limit) <= Number(countdata.value)) return res.status(422).json(collection.getJsonError({ error: "Cannot add more pairs" }));
		if (!customerdata.value.allowed || !customerdata.value.allowed.includes(value.market)) return res.status(422).json(collection.getJsonError({ error: "Cannot be added" }));

		const payload = {
			customerId: value.customerId,
			market: value.market,
			target: value.target,
			price: value.price,
			quantity: value.quantity
		};

		const data = await portfolio._createItem(payload);
		if (data.value) {
			return res.status(200).json(collection.getJsonResponse({ result: data.value }));
		} else {
			return res.status(422).json(collection.getJsonError({ error: "Something went wrong" }));
		}
	} catch (exe) {
		return res.status(400).json(collection.getJsonError({ error: "Something went wrong" }));
	}
};

export const portfolios_update = async (req, res) => {
	try {
		const meta = req.meta;

		const body = req.body || null;
		const params = req.params || null;

		const joiPayload = body && params && { ...body, ...params, ...collection.resolveDetailFromMeta(meta) } || null;
		const { error, value } = joiPayload && joi.validate(joiPayload, joiHelper.UPDATE_USER_PORTFOLIO_PAYLOAD) || joiHelper.DEFAULT_JOI_RESPONSE;
		if (error || !value || (!error && !value)) return res.status(400).json(collection.getJsonError({ error: "Please check payload" }));

		const filter = { customerId: value.customerId, _id: value.objectId };

		const payload = {};
		if (value.price) payload.price = value.price;
		if (value.quantity) payload.quantity = value.quantity;

		if (Object.keys(payload).length < 1) return res.status(400).json(collection.getJsonError({ error: "Please check payload" }));

		const data = await portfolio._updateItem(filter, payload);
		if (data.value) {
			return res.status(200).json(collection.getJsonResponse({ result: true }));
		} else {
			return res.status(422).json(collection.getJsonError({ error: "Something went wrong" }));
		}
	} catch (exe) {
		return res.status(400).json(collection.getJsonError({ error: "Something went wrong" }));
	}
};

export const portfolios_delete = async (req, res) => {
	try {
		const meta = req.meta;

		const params = req.params || null;

		const joiPayload = params && { ...params, ...collection.resolveDetailFromMeta(meta) } || null;
		const { error, value } = joiPayload && joi.validate(joiPayload, joiHelper.DELETE_USER_PORTFOLIO_PAYLOAD) || joiHelper.DEFAULT_JOI_RESPONSE;
		if (error || !value || (!error && !value)) return res.status(400).json(collection.getJsonError({ error: "Please check payload" }));

		const filter = { customerId: value.customerId, _id: value.objectId };
		const data = await portfolio._deleteItem(filter);
		if (data.value) {
			return res.status(200).json(collection.getJsonResponse({ result: data.value }));
		} else {
			return res.status(422).json(collection.getJsonError({ error: "Something went wrong" }));
		}
	} catch (exe) {
		return res.status(400).json(collection.getJsonError({ error: "Something went wrong" }));
	}
};


export const portfolios_get = async (req, res) => {
	try {
		const meta = req.meta;

		const params = req.params || null;

		const joiPayload = params && { ...params, ...collection.resolveDetailFromMeta(meta) } || null;

		let error = null, value = null;
		if (meta.api == api.ADMIN) {
			const inst = joiPayload && joi.validate(joiPayload, joiHelper.GET_ADMIN_PORTFOLIO_PAYLOAD) || joiHelper.DEFAULT_JOI_RESPONSE;
			error = inst.error;
			value = inst.value;
		} else if (meta.api == api.USER) {
			const inst = joiPayload && joi.validate(joiPayload, joiHelper.GET_USER_PORTFOLIO_PAYLOAD) || joiHelper.DEFAULT_JOI_RESPONSE;
			error = inst.error;
			value = inst.value;
		}

		if (error || !value || (!error && !value)) return res.status(400).json(collection.getJsonError({ error: "Please check payload" }));

		const filter = { customerId: value.customerId, _id: value.objectId };

		const data = await portfolio._getItem(filter);
		if (data.value) {
			return res.status(200).json(collection.getJsonResponse({ result: data.value }));
		} else {
			return res.status(422).json(collection.getJsonError({ error: "Something went wrong" }));
		}
	} catch (exe) {
		return res.status(400).json(collection.getJsonError({ error: "Something went wrong" }));
	}
};

export const portfolios = async (req, res) => {
	try {
		const meta = req.meta;

		const query = req.query || null;

		const joiPayload = query && { ...query, ...collection.resolveDetailFromMeta(meta) } || null;

		let error = null, value = null;
		if (meta.api == api.ADMIN) {
			const inst = joiPayload && joi.validate(joiPayload, joiHelper.GET_ADMIN_PORTFOLIOS_PAYLOAD) || joiHelper.DEFAULT_JOI_RESPONSE;
			error = inst.error;
			value = inst.value;
		} else if (meta.api == api.USER) {
			const inst = joiPayload && joi.validate(joiPayload, joiHelper.GET_USER_PORTFOLIOS_PAYLOAD) || joiHelper.DEFAULT_JOI_RESPONSE;
			error = inst.error;
			value = inst.value;
		}

		if (error || !value || (!error && !value)) return res.status(400).json(collection.getJsonError({ error: "Please check payload" }));

		const filter = {};
		if (value.customerId) filter.customerId = value.customerId;
		if (value.market) filter.market = value.market;
		if (value.target) filter.target = value.target;

		const paging = { page: value.page, limit: value.limit };

		const data = await portfolio._filterItem(filter, paging);
		if (data.value) {
			return res.status(200).json(collection.getJsonResponse({ result: data.value }));
		} else {
			return res.status(422).json(collection.getJsonError({ error: "Something went wrong" }));
		}
	} catch (exe) {
		return res.status(400).json(collection.getJsonError({ error: "Something went wrong" }));
	}
};