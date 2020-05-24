const jwt = require("jsonwebtoken");
const md5 = require("md5");

// helper utils
import * as collection from "../helper/collection";

class Security {
	jwtEncode(payload) {
		try {
			return jwt.sign(payload, collection.parseEnvValue(process.env.JWT_SECRET), { expiresIn: collection.parseEnvValue(process.env.REDIS_TOKEN_EXPIRE) });
		} catch (exe) {
			return null;
		}
	}

	jwtVerify(token) {
		try {
			return jwt.verify(token, collection.parseEnvValue(process.env.JWT_SECRET));
		} catch (exe) {
			return null;
		}
	}


	hash(plainText) {
		try {
			return md5(plainText);
		} catch (exe) {
			return null;
		}
	}
}


const security = new Security();
export default security;