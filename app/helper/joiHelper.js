import joi from "joi";

import * as constant from "../helper/constant";

// JOI VALIDATIONS
export const DEFAULT_JOI_RESPONSE = { error: "Something went wrong", value: null };

// ACTIVITY => mongo
export const GET_USER_ACTIVITY_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), objectId: joi.string().trim().hex().length(24).required() });
export const GET_USER_ACTIVITIES_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), page: joi.number().default(1), limit: joi.number().default(20) });
export const GET_ADMIN_ACTIVITY_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), objectId: joi.string().trim().hex().length(24).required() });
export const GET_ADMIN_ACTIVITIES_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }), page: joi.number().default(1), limit: joi.number().default(20) });

// NOTIFICATION => mongo
export const GET_USER_NOTIFICATION_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), objectId: joi.string().trim().hex().length(24).required() });
export const GET_USER_NOTIFICATIONS_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), page: joi.number().default(1), limit: joi.number().default(20) });
export const GET_ADMIN_NOTIFICATION_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), objectId: joi.string().trim().hex().length(24).required() });
export const GET_ADMIN_NOTIFICATIONS_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }), page: joi.number().default(1), limit: joi.number().default(20) });

// MARKET => mongo
export const CREATE_USER_MARKET_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), market: joi.string().trim().valid(constant.setting.meta.markets).required(), target: joi.string().trim().valid(constant.setting.meta.targets).required() });
export const DELETE_USER_MARKET_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), objectId: joi.string().trim().hex().length(24).required() });
export const GET_USER_MARKET_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), objectId: joi.string().trim().hex().length(24).required() });
export const GET_USER_MARKETS_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), page: joi.number().default(1), limit: joi.number().default(20) });
export const GET_ADMIN_MARKET_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), objectId: joi.string().trim().hex().length(24).required() });
export const GET_ADMIN_MARKETS_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }), page: joi.number().default(1), limit: joi.number().default(20) });

// CUSTOMER
export const CREATE_ADMIN_CUSTOMER_PAYLOAD = joi.object().keys({ password: joi.string().trim().required(), type: joi.string().trim().valid(["user", "admin"]), allowed: joi.string().trim(), limit: joi.number() });
export const LOGIN_USER_CUSTOMER_PAYLOAD = joi.object().keys({ userId: joi.string().trim().length(10).required(), password: joi.string().trim().required() });
export const LOGIN_ADMIN_CUSTOMER_PAYLOAD = joi.object().keys({ userId: joi.string().trim().length(10).required(), password: joi.string().trim().required() });
export const UPDATE_ADMIN_CUSTOMER_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), password: joi.string().trim(), allowed: joi.string().trim(), limit: joi.number() });
export const GET_USER_CUSTOMER_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required() });
export const GET_ADMIN_CUSTOMER_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required() });
export const GET_ADMIN_CUSTOMERS_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }), type: joi.string().trim().valid(["user", "admin"]), page: joi.number().default(1), limit: joi.number().default(20) });
