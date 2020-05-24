import moment from "moment";

import circit from "../helper/circit";

import * as constant from "../helper/constant";
import * as collection from "../helper/collection";

export const details_get = async (req, res) => {
	try {
		const ticker = await req.app.redisHelper.hgetall(constant.TICKER_MAP);
		if (ticker.error) return res.status(422).json(collection.getJsonError({ error: "Something went wrong" }));
		if (!ticker.value) ticker.value = {};

		const fticker = {};
		for (var i of Object.keys(ticker.value)) fticker[i] = collection.getJsonFromString(ticker.value[i]);

		return res.status(200).json(collection.getJsonResponse({ result: { ...constant.setting.meta, pairs: circit.get_pairs(), ticker: { ...fticker }, time: moment().format(), } }));
	} catch (exe) {
		console.log(exe);
		return res.status(400).json(collection.getJsonError({ error: "Something went wrong" }));
	}
};