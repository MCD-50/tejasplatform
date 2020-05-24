// helper utils
import * as collection from "../app/helper/collection";

// enum utils
import api from "../app/enum/api";

export const requestCheck = async (req, res, next) => {
	try {
		// validate headers
		// if (!req.headers || !req.headers["user-agent"]) return res.status(400).json(collection.getJsonError({ error: "Unable to get headers" }));
		if (!req.headers) return res.status(400).json(collection.getJsonError({ error: "Unable to get headers" }));
		// eslint-disable-next-line require-atomic-updates
		if (!req.headers.device) req.headers.device = "mobile";

		// attach meta
		const _meta = {
			api: api.PUBLIC,
		};

		// eslint-disable-next-line require-atomic-updates
		req.meta = _meta;
		return next();
	} catch (exe) {
		console.log(exe);
		return res.status(400).json(collection.getJsonError({ error: "Something went wrong" }));
	}
};