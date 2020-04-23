import * as collection from "../app/helper/collection";
import * as constant from "../app/helper/constant";

import api from "../app/enum/api";

import security from "../app/client/security";

export const requestCheck = async (req, res, next) => {
	try {
		if (!req.headers || !req.headers.authorization) return res.status(401).json(collection.getJsonError({ error: "Something went wrong" }));

		// verify the token first
		if (security.jwtVerify(req.headers.authorization) == false) return res.status(401).json(collection.getJsonError({ error: "Something went wrong" }));
		
		const jwtData = security.jwtDecode(req.headers.authorization);
		if (!jwtData || !jwtData.customerId || !jwtData.device || jwtData.type != "admin") return res.status(401).json(collection.getJsonError({ error: "Something went wrong" }));

		// check if token id in redis
		const redKey1 = collection.prepareRedisKey(constant.CUSTOMER_ID_FROM_JWT, collection.prepareRedisKey(jwtData.device, req.headers.authorization));
		const tokenId = await req.app.redisHelper.get(redKey1);
		if (!tokenId || tokenId.error || !tokenId.value || tokenId.value != jwtData.customerId) return res.status(401).json(collection.getJsonError({ error: "Something went wrong" }));

		// attach meta
		const _meta = {
			api: api.ADMIN,
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