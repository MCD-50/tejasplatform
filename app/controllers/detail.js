import moment from "moment";

import * as constant from "../helper/constant";
import * as collection from "../helper/collection";

export const details_get = async (req, res) => {
	try {
		return res.status(200).json(collection.getJsonResponse({ result: { ...constant.setting.meta, time: moment().format(), } }));
	} catch (exe) {
		return res.status(400).json(collection.getJsonError({ error: "Somthing went wrong" }));
	}
};