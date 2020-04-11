import * as collection from "../app/helper/collection";

//import target resolver path
export const routePath = require("path").join(__dirname, "../app/controllers/detail");

export const routes = [
	// goes to global and soft maps
	{ method: "get", endPoint: "details_get@details/get", routePrefix: collection.parseEnvValue(process.env.ROUTE_PREFIX), noMiddleware: true },
];