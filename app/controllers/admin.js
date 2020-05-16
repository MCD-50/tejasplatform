import joi from "joi";

import * as collection from "../helper/collection";
import * as constant from "../helper/constant";
import * as joiHelper from "../helper/joiHelper";

import api from "../enum/api";

// repo
import customer from "../repository/customer";
import security from "../client/security";
import market from "../repository/market";

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
			userId: value.userId,
			password: security.hash(value.password),

			name: value.name || "",
			mobile: value.mobile || "",
			email: value.email || "",
			amount: value.amount || "0",
			location: value.location || "india",
			handler: value.handler || constant.setting.meta.managers[0],
			start: value.start,
			end: value.end,

			type: value.type || "user",
			limit: value.limit || "10",
			allowed: value.allowed || "",
			device: value.device || "all",
		};

		if (Number(value.limit) < constant.setting.meta.headers.length) return res.status(400).json(collection.getJsonError({ error: "Limit must be greater than header limit" }));

		const data = await customer._createItem(payload);
		if (data.value) {
			// add scripts
			constant.setting.meta.headers.map(key => {
				const parts = key.split("_div_");
				
				const _market = parts[0];
				const _target = parts[1];

				const _payload = { customerId: payload.customerId, profile: "default", market: _market, target: _target };
				market._createItem(_payload);
			});

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