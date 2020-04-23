const tsetting = require("../../setting");
export const setting = tsetting;

// SOCKET
export const SOCKET_CHANNEL = "SOCKET_CHANNEL";
export const SOCKET_EVENT = "SOCKET_EVENT";

// maps
export const CUSTOMER_ID_FROM_JWT = "REDIS_CUSTOMER_ID_FROM_JWT";
export const TICKER_MAP = "REDIS_TICKER_MAP";

export const NOT_ALLOWED_UPDATE_FIELDS = ["_id", "customerId", "userId", "objectId", "createdAt", "updatedAt"];

// DB FETCHES
export const DB_FETCH = {
	// MONGO
	customer: "_id customerId userId type name mobile email location handler amount start end limit allowed device freeze createdAt updatedAt",
	activity: "_id customerId ipAddress device createdAt updatedAt",
	market: "_id customerId market target createdAt updatedAt",
	notification: "_id customerId title message createdAt updatedAt",
	plan: "_id name price createdAt updatedAt",
};


export const CUSTOM_DB_FETCH = {
	// MONGO
	customer: "_id customerId userId password type name mobile email location handler amount start end limit allowed freeze createdAt updatedAt",
};