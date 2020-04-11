import piper from "../client/piper";

import * as constant from "../helper/constant";
import * as collection from "../helper/collection";
// import moment from "moment";

// eslint-disable-next-line no-unused-vars
export const _read = (app, fileurl, mom) => {
	// now read the file using pipe
	piper.stream(fileurl, obj => {
		const market = String(obj.market).toLowerCase().split(" ").join("_");
		const target = String(obj.target).toLowerCase().split(" ").join("_");

		// check if valid pair
		// if (!constant.setting.meta.markets.includes(market) || !constant.setting.meta.targets.includes(target)) return null;

		const pair = collection.prepareRedisKey(market, collection.prepareRedisKey("div", target));
		const channel = collection.prepareRedisKey(constant.SOCKET_CHANNEL, market);
		const event = collection.prepareRedisKey(constant.SOCKET_EVENT, target);

		const buffer = Buffer.from(collection.getStringFromJson(obj));

		// and push to room
		app.emitterClient.to(channel).emit(event, buffer);

		// add to redis
		app.redisHelper.hmset(constant.TICKER_MAP, pair, buffer);
	});
};