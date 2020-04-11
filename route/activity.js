import * as collection from "../app/helper/collection";

//import target resolver path
export const routePath = require("path").join(__dirname, "../app/controllers/activity");

export const routes = [
	// customer API calls
	{ method: "get", endPoint: "activities_get@activities/get/:customerId/:objectId", routePrefix: collection.parseEnvValue(process.env.ROUTE_PREFIX) }, //
	{ method: "get", endPoint: "activities@activities", routePrefix: collection.parseEnvValue(process.env.ROUTE_PREFIX) },

	// admin API calls
	{ method: "get", endPoint: "activities_get@activities/get/:customerId/:objectId", routePrefix: collection.parseEnvValue(process.env.ADMIN_ROUTE_PREFIX), adminMiddleware: true },
	{ method: "get", endPoint: "activities@activities", routePrefix: collection.parseEnvValue(process.env.ADMIN_ROUTE_PREFIX), adminMiddleware: true },
];
