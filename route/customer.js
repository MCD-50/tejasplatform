import * as collection from "../app/helper/collection";

//import target resolver path
export const routePath = require("path").join(__dirname, "../app/controllers/customer");

export const routes = [
	// public API calls for cutomer
	{ method: "post", endPoint: "login@login", routePrefix: collection.parseEnvValue(process.env.ROUTE_PREFIX), noMiddleware: true },
	{ method: "post", endPoint: "login@login", routePrefix: collection.parseEnvValue(process.env.ADMIN_ROUTE_PREFIX), noMiddleware: true },
	
	{ method: "delete", endPoint: "logout@logout", routePrefix: collection.parseEnvValue(process.env.ROUTE_PREFIX) },
	{ method: "delete", endPoint: "logout@logout", routePrefix: collection.parseEnvValue(process.env.ADMIN_ROUTE_PREFIX), adminMiddleware: true },


	// -- customer auth
	{ method: "get", endPoint: "customers_get@customers/get/:customerId", routePrefix: collection.parseEnvValue(process.env.ROUTE_PREFIX) }, //

	// -- admin auth
	{ method: "get", endPoint: "customers_get@customers/get/:customerId", routePrefix: collection.parseEnvValue(process.env.ADMIN_ROUTE_PREFIX), adminMiddleware: true }, //
	{ method: "put", endPoint: "customers_update@customers/update/:customerId", routePrefix: collection.parseEnvValue(process.env.ADMIN_ROUTE_PREFIX), adminMiddleware: true }, //
	{ method: "get", endPoint: "customers@customers", routePrefix: collection.parseEnvValue(process.env.ADMIN_ROUTE_PREFIX), adminMiddleware: true },
];
