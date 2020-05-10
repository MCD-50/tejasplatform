import joi from "joi";

import * as collection from "../helper/collection";
import * as joiHelper from "../helper/joiHelper";

import api from "../enum/api";

// repo
import notification from "../repository/notification";

export const notifications_create = async (req, res) => {
	try {
		const meta = req.meta;

		const body = req.body || null;

		const joiPayload = body && { ...body, ...collection.resolveDetailFromMeta(meta) } || null;

		let error = null, value = null;
		if (meta.api == api.ADMIN) {
			const inst = joiPayload && joi.validate(joiPayload, joiHelper.CREATE_ADMIN_NOTIFICATION_PAYLOAD) || joiHelper.DEFAULT_JOI_RESPONSE;
			error = inst.error;
			value = inst.value;
		}

		if (error || !value || (!error && !value)) return res.status(400).json(collection.getJsonError({ error: "Please check payload" }));

		const payload = { 
			customerId: value.customerId, 
			title: value.title, 
			message: value.message, 
		};

		if (value.link) payload.link = value.link;
		
		const data = await notification._createItem(payload);
		if (data.value) {
			return res.status(200).json(collection.getJsonResponse({ result: data.value }));
		} else {
			return res.status(422).json(collection.getJsonError({ error: "Something went wrong" }));
		}
	} catch (exe) {
		return res.status(400).json(collection.getJsonError({ error: "Something went wrong" }));
	}
};

export const notifications_delete = async (req, res) => {
	try {
		const meta = req.meta;

		const params = req.params || null;

		const joiPayload = params && { ...params, ...collection.resolveDetailFromMeta(meta) } || null;

		let error = null, value = null;
		if (meta.api == api.ADMIN) {
			const inst = joiPayload && joi.validate(joiPayload, joiHelper.DELETE_ADMIN_NOTIFICATION_PAYLOAD) || joiHelper.DEFAULT_JOI_RESPONSE;
			error = inst.error;
			value = inst.value;
		}

		if (error || !value || (!error && !value)) return res.status(400).json(collection.getJsonError({ error: "Please check payload" }));

		const filter = { customerId: value.customerId, _id: value.objectId };
		
		const data = await notification._deleteItem(filter);
		if (data.value) {
			return res.status(200).json(collection.getJsonResponse({ result: data.value }));
		} else {
			return res.status(422).json(collection.getJsonError({ error: "Something went wrong" }));
		}
	} catch (exe) {
		return res.status(400).json(collection.getJsonError({ error: "Something went wrong" }));
	}
};

export const notifications_get = async (req, res) => {
	try {
		const meta = req.meta;

		const params = req.params || null;

		const joiPayload = params && { ...params, ...collection.resolveDetailFromMeta(meta) } || null;

		let error = null, value = null;
		if (meta.api == api.ADMIN) {
			const inst = joiPayload && joi.validate(joiPayload, joiHelper.GET_ADMIN_NOTIFICATION_PAYLOAD) || joiHelper.DEFAULT_JOI_RESPONSE;
			error = inst.error;
			value = inst.value;
		} else if (meta.api == api.USER) {
			const inst = joiPayload && joi.validate(joiPayload, joiHelper.GET_USER_NOTIFICATION_PAYLOAD) || joiHelper.DEFAULT_JOI_RESPONSE;
			error = inst.error;
			value = inst.value;
		}

		if (error || !value || (!error && !value)) return res.status(400).json(collection.getJsonError({ error: "Please check payload" }));

		const filter = { customerId: value.customerId, _id: value.objectId };

		const data = await notification._getItem(filter);
		if (data.value) {
			return res.status(200).json(collection.getJsonResponse({ result: data.value }));
		} else {
			return res.status(422).json(collection.getJsonError({ error: "Something went wrong" }));
		}
	} catch (exe) {
		return res.status(400).json(collection.getJsonError({ error: "Something went wrong" }));
	}
};

export const notifications = async (req, res) => {
	try {
		const meta = req.meta;

		const query = req.query || null;

		const joiPayload = query && { ...query, ...collection.resolveDetailFromMeta(meta) } || null;

		let error = null, value = null;
		if (meta.api == api.ADMIN) {
			const inst = joiPayload && joi.validate(joiPayload, joiHelper.GET_ADMIN_NOTIFICATIONS_PAYLOAD) || joiHelper.DEFAULT_JOI_RESPONSE;
			error = inst.error;
			value = inst.value;
		} else if (meta.api == api.USER) {
			const inst = joiPayload && joi.validate(joiPayload, joiHelper.GET_USER_NOTIFICATIONS_PAYLOAD) || joiHelper.DEFAULT_JOI_RESPONSE;
			error = inst.error;
			value = inst.value;
		}

		if (error || !value || (!error && !value)) return res.status(400).json(collection.getJsonError({ error: "Please check payload" }));

		const filter = {};
		if (value.customerId) filter.customerId = value.customerId;
		
		const paging = { page: value.page, limit: value.limit };

		const data = await notification._filterItem(filter, paging);
		if (data.value) {
			return res.status(200).json(collection.getJsonResponse({ result: data.value }));
		} else {
			return res.status(422).json(collection.getJsonError({ error: "Something went wrong" }));
		}
	} catch (exe) {
		return res.status(400).json(collection.getJsonError({ error: "Something went wrong" }));
	}
};