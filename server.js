require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const io_emitter = require("socket.io-emitter");


// const kue = require("kue");
// const kueUI = require("kue-ui-express");

const redis = require("redis");
// helper utils
import * as collection from "./app/helper/collection";

import redisHelper from "./app/helper/redisHelper";

// service utils
import * as ioadapter from "./app/service/ioadpater";

// worker utils
import initialize from "./app/worker/initialize";


const app = express();
const server = require("http").createServer(app);
const io_server = require("socket.io")(server);

app.redisClient = null;
app.emitter = null;
app.kueClient = null;
app.mongoClient = null;

// app.use(express.static(require("path").join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


morgan.token("c-ip", (req) => req.headers["cf-connecting-ip"] || req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || req.ip || "");

// eslint-disable-next-line quotes
app.use(morgan(':c-ip - :date - :method - :url - HTTP/:http-version - :status - :res[content-length] - :response-time ms',
	{
		stream: {
			write: (msg) => {
				// ignore the kue and checks
				if (msg && (msg.includes("/kue") || msg.includes("/ - HTTP/1.1"))) return null;
				console.log("MORGAN", msg);
			}
		}
	}));

//setup mongoose
mongoose.connect(collection.parseEnvValue(process.env.MONGO_URI), {
	reconnectTries: collection.parseEnvValue(process.env.MONGO_RECONNECT_TRIES),
	reconnectInterval: collection.parseEnvValue(process.env.MONGO_RECONNECT_INTERVAL),
	autoReconnect: collection.parseEnvValue(process.env.MONGO_AUTO_RECONNECT),
	dbName: collection.parseEnvValue(process.env.MONGO_DB_NAME)
});

mongoose.connection.on("open", () => {
	// set to mongoose
	app.mongoClient = mongoose;

	//setup redis
	const redisClient = redis.createClient({
		prefix: collection.parseEnvValue(process.env.REDIS_PREFIX),
		host: collection.parseEnvValue(process.env.REDIS_HOST),
		port: collection.parseEnvValue(process.env.REDIS_PORT),
	});

	redisClient.on("ready", async () => {
		app.redisClient = redisClient;
		const _redisHelper = new redisHelper(redisClient);
		app.redisHelper = _redisHelper;

		// init adapter
		ioadapter._initialize(app, io_server);

		// setup io emitter
		app.emitter = io_emitter(redis.createClient({
			host: collection.parseEnvValue(process.env.REDIS_HOST),
			port: collection.parseEnvValue(process.env.REDIS_PORT),
		}));
	});

	// setup kue
	// const kueClient = kue.createQueue({
	// 	prefix: collection.parseEnvValue(process.env.KUE_PREFIX),
	// 	redis: {
	// 		host: collection.parseEnvValue(process.env.KUE_HOST),
	// 		port: collection.parseEnvValue(process.env.KUE_PORT),
	// 	}
	// });

	// kueClient.setMaxListeners(500);
	// kueClient.watchStuckJobs(10000);
	// app.kueClient = kueClient;
	// kueClient
	// 	.on("job complete", (id) => {
	// 		kue.Job.get(id, (err, job) => {
	// 			if (err) return;
	// 			job.remove((err) => {
	// 				if (err) return;
	// 			});
	// 		});
	// 	})
	// 	.on("job failed", (id) => {
	// 		kue.Job.get(id, async (err, job) => {
	// 			if (err) return;
	// 			if (job._max_attempts > 0) {
	// 				// get payload
	// 				console.log("JOB FAIL", `Job of type ${job.type} with id ${id} has failed.`);
	// 			}
	// 		});
	// 	});

	// enable routes
	require("./engine").default(app);

	// kafka event emitter hack
	// require("events").EventEmitter.prototype._maxListeners = 3000;


	// start server
	server.listen(collection.parseEnvValue(process.env.PORT), collection.parseEnvValue(process.env.HOST), async () => {
		console.log("APP", `Server running on port ${collection.parseEnvValue(process.env.PORT)} and on host ${collection.parseEnvValue(process.env.HOST)}.....`);
		process.on("unhandledRejection", (reason, promise) => {
			console.log("APP_ERROR", "Uncaught error in", reason, promise);
			process.exit(0);
		});

		process.on("uncaughtException", (reason, promise) => {
			console.log("APP_ERROR", "Uncaught error in", reason, promise);
			process.exit(0);
		});

		process.once("SIGTERM", () => {
			// kueClient.shutdown(5000, (err) => {
			// 	console.log("APP_ERROR", "Kue shutdown", err);
			// 	process.exit(0);
			// });
		});

		initialize(app);
	});
});

mongoose.connection.on("error", (err) => {
	console.log("MONGO", "Could not connect to mongo server!", err);
});

