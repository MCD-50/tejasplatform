import piper from "../client/piper";

import * as constant from "../helper/constant";
import * as collection from "../helper/collection";
// import moment from "moment";

import circit from "../helper/circit";

// eslint-disable-next-line no-unused-vars
export const _read = (app, fileurl, mom) => {
	// now read the file using pipe
	piper.stream(fileurl, obj => {
		if (!obj) return null;

		const market = String(obj.market);
		const target = String(obj.target);

		if (market && target) {
			// check if valid pair
			if (!constant.setting.meta.markets.includes(market)) return null;

			const channel = collection.prepareRedisKey(constant.SOCKET_CHANNEL, market);
			const event = collection.prepareRedisKey(constant.SOCKET_EVENT, target);

			const pair = collection.prepareRedisKey(market, collection.prepareRedisKey("div", target));

			const buffer = collection.getStringFromJson(obj);

			if (circit.get_change_map(pair) == buffer) return null;
			circit.set_change_map(pair, buffer);
			
			// and push to room
			app.emitter && app.emitter.to(channel).emit(event, buffer);
		}
	});
};

// eslint-disable-next-line no-unused-vars
export const _persist = (app, fileurl, mom) => {
	// now read the file using pipe
	piper.stream(fileurl, obj => {
		if (!obj) return null;
		
		const market = String(obj.market);
		const target = String(obj.target);

		if (market && target) {
			// check if valid pair
			if (!constant.setting.meta.markets.includes(market)) return null;

			const pair = collection.prepareRedisKey(market, collection.prepareRedisKey("div", target));
			const buffer = collection.getStringFromJson(obj);

			// add to redis
			app.redisHelper.hmset(constant.TICKER_MAP, pair, buffer);

			// at last
			circit.set_pairs(pair);
		}
	});
};

// eslint-disable-next-line no-unused-vars
export const _delete = (app) => {
	// now read the file using pipe
	app.redisHelper.del(constant.TICKER_MAP);
};
