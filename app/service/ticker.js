import piper from "../client/piper";

import * as constant from "../helper/constant";
import * as collection from "../helper/collection";
// import moment from "moment";

import circit from "../helper/circit";

// eslint-disable-next-line no-unused-vars
export const _read = (app, fileurl, mom) => {
	// now read the file using pipe
	piper.stream(fileurl, obj => {
		const market = String(obj.market).toLowerCase().split(" ").join("_");
		const target = String(obj.target).toLowerCase().split(" ").join("_");

		// check if valid pair
		// if (!constant.setting.meta.markets.includes(market) || !constant.setting.meta.targets.includes(target)) return null;

		const channel = collection.prepareRedisKey(constant.SOCKET_CHANNEL, market);
		const event = collection.prepareRedisKey(constant.SOCKET_EVENT, target);
		const pair = collection.prepareRedisKey(market, collection.prepareRedisKey("div", target));

		const buffer = collection.getStringFromJson(obj);

		if (circit.get_change_map(pair) == buffer) return null;
		circit.set_change_map(pair, buffer);

		// and push to room
		app.emitter.to(channel).emit(event, buffer);
	});
};

// eslint-disable-next-line no-unused-vars
export const _persist = (app, fileurl, mom) => {
	// now read the file using pipe
	piper.stream(fileurl, obj => {
		const market = String(obj.market).toLowerCase().split(" ").join("_");
		const target = String(obj.target).toLowerCase().split(" ").join("_");

		// check if valid pair
		// if (!constant.setting.meta.markets.includes(market) || !constant.setting.meta.targets.includes(target)) return null;

		const pair = collection.prepareRedisKey(market, collection.prepareRedisKey("div", target));
		const buffer = collection.getStringFromJson(obj);

		// add to redis
		app.redisHelper.hmset(constant.TICKER_MAP, pair, buffer);
	});
};
