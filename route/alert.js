import * as collection from "../app/helper/collection";

//import target resolver path
export const routePath = require("path").join(__dirname, "../app/controllers/alert");

export const routes = [
	// customer API calls
	{ method: "post", endPoint: "alerts_create@alerts/create", routePrefix: collection.parseEnvValue(process.env.ROUTE_PREFIX) }, //
	{ method: "get", endPoint: "alerts_get@alerts/get/:customerId/:objectId", routePrefix: collection.parseEnvValue(process.env.ROUTE_PREFIX) }, //
	{ method: "put", endPoint: "alerts_update@alerts/update/:customerId/:objectId", routePrefix: collection.parseEnvValue(process.env.ROUTE_PREFIX) }, //
	{ method: "delete", endPoint: "alerts_delete@alerts/delete/:customerId/:objectId", routePrefix: collection.parseEnvValue(process.env.ROUTE_PREFIX) },
	{ method: "get", endPoint: "alerts@alerts", routePrefix: collection.parseEnvValue(process.env.ROUTE_PREFIX) },

	// // admin API calls
	{ method: "get", endPoint: "alerts_get@alerts/get/:customerId/:objectId", routePrefix: collection.parseEnvValue(process.env.ADMIN_ROUTE_PREFIX), adminMiddleware: true },
	{ method: "get", endPoint: "alerts@alerts", routePrefix: collection.parseEnvValue(process.env.ADMIN_ROUTE_PREFIX), adminMiddleware: true },
];
