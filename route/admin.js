import * as collection from "../app/helper/collection";

//import target resolver path
export const routePath = require("path").join(__dirname, "../app/controllers/admin");

export const routes = [
	// admin API calls
	{ method: "post", endPoint: "register@register", routePrefix: collection.parseEnvValue(process.env.ADMIN_ROUTE_PREFIX), adminMiddleware: true },
	
	{ method: "get", endPoint: "admins_get@admins/get/:customerId", routePrefix: collection.parseEnvValue(process.env.ADMIN_ROUTE_PREFIX), adminMiddleware: true }, //
];
