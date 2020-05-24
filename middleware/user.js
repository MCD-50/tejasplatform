import moment from "moment";

import * as collection from "../app/helper/collection";

import api from "../app/enum/api";

import security from "../app/client/security";

export const requestCheck = async (req, res, next) => {
	try {
		if (!req.headers || !req.headers.authorization) return res.status(401).json(collection.getJsonError({ error: "Something went wrong" }));

		// verify the token first
		if (!security.jwtVerify(req.headers.authorization)) return res.status(401).json(collection.getJsonError({ error: "Something went wrong" }));

		const jwtData = security.jwtVerify(req.headers.authorization);
		if (!jwtData || !jwtData.customerId || !jwtData.device || jwtData.type != "user") return res.status(401).json(collection.getJsonError({ error: "Something went wrong" }));

		if (!jwtData.end || moment(jwtData.end).isBefore(moment())) {
			return res.status(422).json(collection.getJsonError({ error: "Subscription expired" }));
		}

		// attach meta
		const _meta = {
			api: api.USER,
			customerId: jwtData.customerId,
		};

		// reset the device
		req.headers.device = jwtData.device;

		// eslint-disable-next-line require-atomic-updates
		req.meta = _meta;
		return next();
	} catch (exe) {
		console.log(exe);
		return res.status(400).json(collection.getJsonError({ error: "Something went wrong" }));
	}
};