import piper from "../client/piper";

// import * as constant from "../helper/constant";

export const _read = (app, fileurl) => {
	// now read the file using pipe
	piper.stream(fileurl, obj => {
		const market = String(obj.market).toLowerCase().split(" ").join("_");
		const target = String(obj.target).toLowerCase().split(" ").join("_");

		// check if valid pair
		// if (!constant.setting.meta.markets.includes(market) || !constant.setting.meta.targets.includes(target)) return null;

		// and push to room

		// add to redis

	});
};