import * as collection from "../app/helper/collection";

//import target resolver path
export const routePath = require("path").join(__dirname, "../app/controllers/announcement");

export const routes = [
	// customer API calls
	{ method: "get", endPoint: "announcements_get@announcements/get/:objectId", routePrefix: collection.parseEnvValue(process.env.ROUTE_PREFIX) },
	{ method: "get", endPoint: "announcements@announcements", routePrefix: collection.parseEnvValue(process.env.ROUTE_PREFIX) },
	
	// admin API calls
	{ method: "post", endPoint: "announcements_create@announcements/create", routePrefix: collection.parseEnvValue(process.env.ADMIN_ROUTE_PREFIX), adminMiddleware: true },
	{ method: "get", endPoint: "announcements_get@announcements/get/:objectId", routePrefix: collection.parseEnvValue(process.env.ADMIN_ROUTE_PREFIX), adminMiddleware: true },
	{ method: "delete", endPoint: "announcements_delete@announcements/delete/:objectId", routePrefix: collection.parseEnvValue(process.env.ADMIN_ROUTE_PREFIX), adminMiddleware: true },
	{ method: "get", endPoint: "announcements@announcements", routePrefix: collection.parseEnvValue(process.env.ADMIN_ROUTE_PREFIX), adminMiddleware: true },
];
