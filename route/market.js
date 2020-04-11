import * as collection from "../app/helper/collection";

//import target resolver path
export const routePath = require("path").join(__dirname, "../app/controllers/market");

export const routes = [
	// customer API calls
	{ method: "post", endPoint: "markets_create@markets/create", routePrefix: collection.parseEnvValue(process.env.ROUTE_PREFIX) }, //
	{ method: "get", endPoint: "markets_get@markets/get/:customerId/:objectId", routePrefix: collection.parseEnvValue(process.env.ROUTE_PREFIX) }, //
	{ method: "delete", endPoint: "markets_delete@markets/delete/:customerId/:objectId", routePrefix: collection.parseEnvValue(process.env.ROUTE_PREFIX) },
	{ method: "get", endPoint: "markets@markets", routePrefix: collection.parseEnvValue(process.env.ROUTE_PREFIX) },

	// // admin API calls
	{ method: "get", endPoint: "markets_get@markets/get/:customerId/:objectId", routePrefix: collection.parseEnvValue(process.env.ADMIN_ROUTE_PREFIX), adminMiddleware: true },
	{ method: "get", endPoint: "markets@markets", routePrefix: collection.parseEnvValue(process.env.ADMIN_ROUTE_PREFIX), adminMiddleware: true },
];