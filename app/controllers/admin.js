import joi from "joi";

import * as collection from "../helper/collection";
import * as joiHelper from "../helper/joiHelper";

import api from "../enum/api";

// repo
import customer from "../repository/customer";
import security from "../client/security";

export const register = async (req, res) => {
	try {
		const meta = req.meta;

		const body = req.body || null;

		const joiPayload = body && { ...body, ...collection.resolveDetailFromMeta(meta) } || null;

		let error = null, value = null;
		if (meta.api == api.ADMIN) {
			const inst = joiPayload && joi.validate(joiPayload, joiHelper.CREATE_ADMIN_CUSTOMER_PAYLOAD) || joiHelper.DEFAULT_JOI_RESPONSE;
			error = inst.error;
			value = inst.value;
		}

		if (error || !value || (!error && !value)) return res.status(400).json(collection.getJsonError({ error: "Please check payload" }));

		const payload = {
			customerId: collection.getUUID(),
			userId: collection.getSeed(10),
			password: security.hash(value.password),

			name: value.name || "",
			mobile: value.mobile || "",
			email: value.email || "",
			amount: value.amount || "0",
			location: value.location || "",
			handler: value.handler || "",
			start: value.start,
			end: value.end,


			type: value.type || "user",
			limit: value.limit || "0",
			allowed: value.allowed || "",
			device: value.device || "mobile",
		};

		const data = await customer._createItem(payload);
		if (data.value) {
			return res.status(200).json(collection.getJsonResponse({ result: true }));
		} else {
			return res.status(422).json(collection.getJsonError({ error: "Something went wrong" }));
		}
	} catch (exe) {
		return res.status(400).json(collection.getJsonError({ error: "Something went wrong" }));
	}
};

export const admins_get = async (req, res) => {
	try {
		const meta = req.meta;

		const joiPayload = { ...collection.resolveDetailFromMeta(meta, true) } || null;

		let error = null, value = null;
		if (meta.api == api.ADMIN) {
			const inst = joiPayload && joi.validate(joiPayload, joiHelper.GET_ADMIN_CUSTOMER_PAYLOAD) || joiHelper.DEFAULT_JOI_RESPONSE;
			error = inst.error;
			value = inst.value;
		}

		if (error || !value || (!error && !value)) return res.status(400).json(collection.getJsonError({ error: "Please check payload" }));

		const filter = { customerId: value.customerId };
		const data = await customer._getItem(filter);
		if (data.value) {
			return res.status(200).json(collection.getJsonResponse({ result: data.value }));
		} else {
			return res.status(422).json(collection.getJsonError({ error: "Something went wrong" }));
		}
	} catch (exe) {
		return res.status(400).json(collection.getJsonError({ error: "Something went wrong" }));
	}
};