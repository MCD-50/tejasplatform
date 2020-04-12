const io_adapter = require("socket.io-redis");

import * as constant from "../helper/constant";
import * as collection from "../helper/collection";

// client
import security from "../client/security";

export const _initialize = (app, io_server) => {

	// setup io adapter
	io_server.adapter(io_adapter({
		host: collection.parseEnvValue(process.env.REDIS_HOST),
		port: collection.parseEnvValue(process.env.REDIS_PORT),
	}));

	io_server
		.use(async (socket, next) => {
			// eslint-disable-next-line no-use-before-define
			const data = await _parse_user_detail(app, socket);
			socket["userId"] = data && data.userId || "";
			socket["customerId"] = data && data.customerId || "";
			socket["id"] = data && data.id || collection.getUUID();
			next();
		})
		// eslint-disable-next-line no-unused-vars
		.on("connection", (socket) => {

			// connection success
			socket.emit(collection.prepareRedisKey(constant.SOCKET_EVENT, "connected"), { message: { userId: socket["userId"], id: socket["id"] } });

			// on join
			socket.on(collection.prepareRedisKey(constant.SOCKET_EVENT, "join"), async (room) => {

				try {

					if (!socket.userId || !socket.customerId) {
						return socket.emit(collection.prepareRedisKey(constant.SOCKET_EVENT, "join_error"), { message: { error: "User is not authenticated" } });
					}

					// just seperating the channel from the room
					var name = room.replace(constant.SOCKET_CHANNEL, "");
					name = name.slice(1, name.length);

					// join error
					if (!constant.setting.meta.markets.includes(name)) {
						return socket.emit(collection.prepareRedisKey(constant.SOCKET_EVENT, "join_error"), { message: { error: "Room name is not valid" } });
					}

					// join
					// / in the namesace and socket is the key
					io_server.of("/").adapter.remoteJoin(socket["id"], room, (err) => {
						if (err) return socket.emit(collection.prepareRedisKey(constant.SOCKET_EVENT, "join_error"), { message: { error: "Unable to join room" } });

						// success
						socket.emit(collection.prepareRedisKey(constant.SOCKET_EVENT, "join_success"), { message: { error: "Joined room" } });
					});
				} catch (exe) {
					// join error
					return socket.emit(collection.prepareRedisKey(constant.SOCKET_EVENT, "join_error"), { message: { error: "Unable to join room" } });
				}
			});


			// on leave
			socket.on(collection.prepareRedisKey(constant.SOCKET_EVENT, "leave"), async (room) => {

				try {

					if (!socket.userId || !socket.customerId) {
						return socket.emit(collection.prepareRedisKey(constant.SOCKET_EVENT, "leave_error"), { message: { error: "User is not authenticated" } });
					}

					// just seperating the channel from the room
					var name = room.replace(constant.SOCKET_CHANNEL, "");
					name = name.slice(1, name.length);

					// join error
					if (!constant.setting.meta.markets.includes(name)) {
						return socket.emit(collection.prepareRedisKey(constant.SOCKET_EVENT, "leave_error"), { message: { error: "Room name is not valid" } });
					}

					// leave
					// / in the namesace and socket is the key
					io_server.of("/").adapter.remoteLeave(socket["id"], room, (err) => {
						if (err) return socket.emit(collection.prepareRedisKey(constant.SOCKET_EVENT, "leave_error"), { message: { error: "Unable to leave room" } });

						// succees
						socket.emit(collection.prepareRedisKey(constant.SOCKET_EVENT, "leave_success"), { message: { error: "Left room" } });
					});
				} catch (exe) {
					// join error
					return socket.emit(collection.prepareRedisKey(constant.SOCKET_EVENT, "leave_error"), { message: { error: "Unable to leave room" } });
				}
			});
		});
};

// internal method
const _parse_user_detail = async (app, socket) => {
	try {
		if (!socket.handshake.query["authorization"] || socket.request.headers["user-agent"]) throw { error: "Not authorized to access the sockets" };

		// now check if token can be parsed
		if (security.jwtVerify(socket.handshake.query["authorization"]) == false) throw { error: "Not authorized to access the sockets" };

		// check if token id in redis
		const redKey1 = collection.prepareRedisKey(constant.CUSTOMER_ID_FROM_JWT, collection.prepareRedisKey(collection.parseUserAgent(socket.request.headers["user-agent"]), socket.handshake.query["authorization"]));
		const tokenId = await app.redisHelper.get(redKey1);
		if (!tokenId || tokenId.error || !tokenId.value) throw { error: "Not authorized to access the sockets" };

		const jwtData = security.jwtDecode(socket.handshake.query["authorization"]);
		if (!jwtData || !jwtData.customerId || !jwtData.userId || jwtData.customerId != tokenId.value || jwtData.type != "user") throw { error: "Not authorized to access the sockets" };

		return { userId: jwtData.userId, customerId: jwtData.customerId, id: collection.getUUID() };
	} catch (exe) {
		return { userId: "", customerId: "", id: collection.getUUID() };
	}
};