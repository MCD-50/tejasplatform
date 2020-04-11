import * as collection from "../app/helper/collection";

//import target resolver path
export const routePath = require("path").join(__dirname, "../app/controllers/notification");

export const routes = [
	// customer API calls
	{ method: "get", endPoint: "notifications_get@notifications/get/:customerId/:objectId", routePrefix: collection.parseEnvValue(process.env.ROUTE_PREFIX) }, //
	{ method: "get", endPoint: "notifications@notifications", routePrefix: collection.parseEnvValue(process.env.ROUTE_PREFIX) },

	// admin API calls
	{ method: "get", endPoint: "notifications_get@notifications/get/:customerId/:objectId", routePrefix: collection.parseEnvValue(process.env.ADMIN_ROUTE_PREFIX), adminMiddleware: true },
	{ method: "get", endPoint: "notifications@notifications", routePrefix: collection.parseEnvValue(process.env.ADMIN_ROUTE_PREFIX), adminMiddleware: true },
];
