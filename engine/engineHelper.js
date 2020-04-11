// system imports
const fs = require("fs");

// helper utils
import * as collection from "../app/helper/collection";

// middleware utils
import * as common from "../middleware/common";
import * as admin from "../middleware/admin";
import * as user from "../middleware/user";


//import all .js files in current folder and ignores index.js and any folder
const autoImport = (app, folderPath, isRoute = false) => {
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async (resolve) => {
		// get all acceptable files
		const files = fs.readdirSync(folderPath).filter(x => !x.includes("index.js") && !x.includes("engineHelper.js")).filter(x => x.includes(".js"));

		// resolve all promises
		// eslint-disable-next-line no-use-before-define
		const promises = files.map(async (file) => resolvePath(app, file, folderPath, isRoute));

		// resolve when all finished
		Promise.all(promises).then(() => resolve());
	});
};

const resolvePath = (app, file, folderPath, isRoute) => {
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async (resolve) => {
		const filePath = collection.getFileUrl(folderPath, file);

		// resolve if directory
		if (require("fs").statSync(filePath).isDirectory()) {
			return resolve(1);
		}

		// import schema if not route
		if (!isRoute) {
			require(filePath).default(app);
			return resolve();
		}

		// import and setup routes
		const fileInstance = require(filePath);

		const routes = fileInstance.routes;

		// take route path and convert it to a controller path
		const controllerPath = require(fileInstance.routePath);

		// no routes found
		if (!routes || routes.length < 0) {
			return resolve();
		}

		for (let route of routes) {
			const parts = route.endPoint.split("@");

			const handerValue = parts[0];
			const patternValue = parts[1];
			const routePrefix = route.routePrefix || collection.parseEnvValue(process.env.ROUTE_PREFIX);

			// push default middleware
			const middleware = [];

			// if no middleware then don't add anything
			middleware.push(common.requestCheck);

			if (route.adminMiddleware) middleware.push(admin.requestCheck);
			else if (!route.noMiddleware) middleware.push(user.requestCheck);

			const method = route.method;
			const pattern = routePrefix + "/" + patternValue;
			const handler = controllerPath[handerValue];

			app[method](pattern, middleware, (req, res, next) => {
				// call the controller
				handler(req, res, next);
			});

			// log the routes
			console.log("ROUTES", `${method} => ${pattern}`);
		}

		return resolve();
	});
};

export default autoImport;