const tsetting = require("../../setting");
export const setting = tsetting;

// SOCKET
export const SOCKET_CHANNEL = "SOCKET_CHANNEL";
export const SOCKET_EVENT = "SOCKET_EVENT";

// maps
export const CUSTOMER_ID_FROM_JWT = "REDIS_CUSTOMER_ID_FROM_JWT";

export const NOT_ALLOWED_UPDATE_FIELDS = ["_id", "customerId", "email", "eId", "secret", "key", "objectId", "createdAt", "updatedAt"];

// DB FETCHES
export const DB_FETCH = {
	// MONGO
	activity: "_id customerId ipAddress device reported appName createdAt updatedAt",
	announcement: "_id title message announcementType appName createdAt updatedAt",
	confirmation: "_id hash oaccountAddress saccountAddress raccountAddress oconfirmation sconfirmation rconfirmation status currencyType appName createdAt updatedAt",
	exchange: "_id fromObjectId toObjectId customerId amount rate status fromCurrencyType toCurrencyType appName createdAt updatedAt",
	log: "_id customerId ipAddress device url code appName createdAt updatedAt",
	upload: "_id customerId value documentUrl format uploadType docType appName createdAt updatedAt",
	notification: "_id customerId title message notificationType referenceId referenceType appName createdAt updatedAt",

	// SEQUALIZE
	// password, authenticatorCode
	customer: ["_id", "eId", "email", "mobile", "customerId", "pathType", "mobileCode", "firstName", "lastName", "dob", "gender", "country", "customerType", "accessType", "emailVerified", "mobileVerified", "authPreference", "kycStatus", "kycHash", "blockchainHash", "blockchainVerified", "createdAt", "updatedAt", "lockVersion"],
	// password, privateKey
	wallet: ["_id", "customerId", "accountAddress", "tagAddress", "currencyType", "current", "reserved", "escrow", "createdAt", "updatedAt", "lockVersion"],
	transaction: ["_id", "customerId", "baseObjectId", "sourceAccountAddress", "destinationAccountAddress", "destinationAccountTag", "amount", "transactionHash", "fees", "currencyType", "status", "type", "appName", "createdAt", "updatedAt", "lockVersion"],
};


export const CUSTOM_DB_FETCH = {
	// MONGO


	// SEQUALIZE
	customer: ["_id", "eId", "email", "mobile", "customerId", "password", "authenticatorCode", "pathType", "mobileCode", "firstName", "lastName", "dob", "gender", "country", "customerType", "accessType", "emailVerified", "mobileVerified", "authPreference", "kycStatus", "kycHash", "blockchainHash", "blockchainVerified", "createdAt", "updatedAt", "lockVersion"],
	wallet: ["_id", "customerId", "accountAddress", "tagAddress", "currencyType", "password", "privateKey", "current", "reserved", "escrow", "createdAt", "updatedAt", "lockVersion"],
};