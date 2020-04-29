import * as collection from "../app/helper/collection";

//import target resolver path
export const routePath = require("path").join(__dirname, "../app/controllers/portfolio");

export const routes = [
	// customer API calls
	{ method: "post", endPoint: "portfolios_create@portfolios/create", routePrefix: collection.parseEnvValue(process.env.ROUTE_PREFIX) }, //
	{ method: "get", endPoint: "portfolios_get@portfolios/get/:customerId/:objectId", routePrefix: collection.parseEnvValue(process.env.ROUTE_PREFIX) }, //
	{ method: "delete", endPoint: "portfolios_delete@portfolios/delete/:customerId/:objectId", routePrefix: collection.parseEnvValue(process.env.ROUTE_PREFIX) },
	{ method: "get", endPoint: "portfolios@portfolios", routePrefix: collection.parseEnvValue(process.env.ROUTE_PREFIX) },

	// // admin API calls
	{ method: "get", endPoint: "portfolios_get@portfolios/get/:customerId/:objectId", routePrefix: collection.parseEnvValue(process.env.ADMIN_ROUTE_PREFIX), adminMiddleware: true },
	{ method: "get", endPoint: "portfolios@portfolios", routePrefix: collection.parseEnvValue(process.env.ADMIN_ROUTE_PREFIX), adminMiddleware: true },
];
