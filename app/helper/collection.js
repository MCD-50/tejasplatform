import uuid from "uuid/v1";
import randomstring from "randomstring";
import useragent from "useragent";

import api from "../enum/api";

export const parseUserAgent = (text) => {
	try {
		const agent = useragent.parse(text);

		const parts = agent.toString().split("/");

		const browser = parts[0].trim();
		const platform = parts[1].trim();
		const device = agent.device.family.toString();

		return `${browser}(Device-${device} | Platform-${platform})`;
	} catch (exe) {
		console.log(exe);
		return "unidentified";
	}
};

export const resolveDetailFromMeta = (meta, preserveAdmin = false) => {
	if (!meta || !meta.api) return {};

	// return empty object wherever not required
	if (meta.api == api.PUBLIC) return {};
	else if (meta.api == api.USER) return { customerId: meta.customerId };
	else if (meta.api == api.ADMIN) {
		if (!preserveAdmin) return {};
		else return { customerId: meta.customerId };
	}
	return {};
};

export const getReverse = (obj) => Object.assign({}, ...Object.entries(obj).map(([a, b]) => ({ [b]: a })));

// redis key utils
export const prepareRedisKey = (key, value, divider = "_") => (key + divider + value);
// used to generate random string
export const getSeed = (length = 32, charset = "hex") => randomstring.generate({ length: length, charset: charset, capitalization: "uppercase" });
// used to get uuid
export const getUUID = () => uuid();
// get absolute file url
export const getFileUrl = (...args) => args.length > 1 ? args.join("/") : "./" + args;
export const getJsonResponse = (response) => ({ ...response });
export const getJsonError = (error) => ({ ...error });
export const parseEnvValue = (value) => {
	if (value.startsWith("num_")) {
		return Number(value.replace("num_", "").trim());
	} else if (value.startsWith("bool_")) {
		return value.includes("true");
	} else {
		return value;
	}
};


// get string from json object
export const getStringFromJson = (jsonData) => {
	try {
		//jsonString = passJsonCheck(jsonString);
		return JSON.stringify(jsonData);
	} catch (exe) {
		// console.log(exe);
	}
	return jsonData;
};

// get json from the string object
export const getJsonFromString = (jsonString) => {
	try {
		//jsonString = passJsonCheck(jsonString);
		return JSON.parse(jsonString);
	} catch (exe) {
		// console.log(exe);
	}
	return jsonString;
};