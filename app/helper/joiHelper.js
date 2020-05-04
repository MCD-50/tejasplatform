import joi from "joi";

import * as constant from "../helper/constant";

// JOI VALIDATIONS
export const DEFAULT_JOI_RESPONSE = { error: "Something went wrong", value: null };

// ACTIVITY => mongo
export const GET_USER_ACTIVITY_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), objectId: joi.string().trim().hex().length(24).required() });
export const GET_USER_ACTIVITIES_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), page: joi.number().default(1), limit: joi.number().default(20) });
export const GET_ADMIN_ACTIVITY_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), objectId: joi.string().trim().hex().length(24).required() });
export const GET_ADMIN_ACTIVITIES_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }), ipAddress: joi.string().trim(), page: joi.number().default(1), limit: joi.number().default(20) });

// NOTIFICATION => mongo
export const GET_USER_NOTIFICATION_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), objectId: joi.string().trim().hex().length(24).required() });
export const GET_USER_NOTIFICATIONS_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), page: joi.number().default(1), limit: joi.number().default(20) });
export const GET_ADMIN_NOTIFICATION_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), objectId: joi.string().trim().hex().length(24).required() });
export const GET_ADMIN_NOTIFICATIONS_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }), page: joi.number().default(1), limit: joi.number().default(20) });

// MARKET => mongo
export const CREATE_USER_MARKET_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), profile: joi.string().trim().required(), market: joi.string().trim().valid(constant.setting.meta.markets).required(), target: joi.string().trim().required() });
export const UPDATE_USER_MARKET_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), objectId: joi.string().trim().hex().length(24).required(), target: joi.string().trim() });
export const DELETE_USER_MARKET_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), objectId: joi.string().trim().hex().length(24).required() });
export const GET_USER_MARKET_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), objectId: joi.string().trim().hex().length(24).required() });
export const GET_USER_MARKETS_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), profile: joi.string().trim(), market: joi.string().trim().valid(constant.setting.meta.markets), target: joi.string().trim(), page: joi.number().default(1), limit: joi.number().default(20) });
export const GET_ADMIN_MARKET_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), objectId: joi.string().trim().hex().length(24).required() });
export const GET_ADMIN_MARKETS_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }), profile: joi.string().trim(), market: joi.string().trim().valid(constant.setting.meta.markets), target: joi.string().trim(), page: joi.number().default(1), limit: joi.number().default(20) });

// PORTFOLIO => mongo
export const CREATE_USER_PORTFOLIO_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), market: joi.string().trim().valid(constant.setting.meta.markets).required(), target: joi.string().trim().required(), price: joi.string().trim().regex(/^[0-9]{1,15}(\.[0-9]{1,8})?$/).required(), quantity: joi.string().trim().regex(/^[0-9]{1,15}(\.[0-9]{1,8})?$/).required() });
export const UPDATE_USER_PORTFOLIO_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), objectId: joi.string().trim().hex().length(24).required(), price: joi.string().trim().regex(/^[0-9]{1,15}(\.[0-9]{1,8})?$/), quantity: joi.string().trim().regex(/^[0-9]{1,15}(\.[0-9]{1,8})?$/) });
export const DELETE_USER_PORTFOLIO_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), objectId: joi.string().trim().hex().length(24).required() });
export const GET_USER_PORTFOLIO_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), objectId: joi.string().trim().hex().length(24).required() });
export const GET_USER_PORTFOLIOS_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), market: joi.string().trim().valid(constant.setting.meta.markets), target: joi.string().trim(), page: joi.number().default(1), limit: joi.number().default(20) });
export const GET_ADMIN_PORTFOLIO_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), objectId: joi.string().trim().hex().length(24).required() });
export const GET_ADMIN_PORTFOLIOS_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }), market: joi.string().trim().valid(constant.setting.meta.markets), target: joi.string().trim(), page: joi.number().default(1), limit: joi.number().default(20) });

// ALERT => mongo
export const CREATE_USER_ALERT_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), market: joi.string().trim().valid(constant.setting.meta.markets).required(), target: joi.string().trim().required(), price: joi.string().trim().regex(/^[0-9]{1,15}(\.[0-9]{1,8})?$/).required(), trigger: joi.string().trim().required() });
export const UPDATE_USER_ALERT_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), objectId: joi.string().trim().hex().length(24).required(), price: joi.string().trim().regex(/^[0-9]{1,15}(\.[0-9]{1,8})?$/), trigger: joi.string().trim().required() });
export const DELETE_USER_ALERT_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), objectId: joi.string().trim().hex().length(24).required() });
export const GET_USER_ALERT_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), objectId: joi.string().trim().hex().length(24).required() });
export const GET_USER_ALERTS_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), market: joi.string().trim().valid(constant.setting.meta.markets), target: joi.string().trim(), page: joi.number().default(1), limit: joi.number().default(20) });
export const GET_ADMIN_ALERT_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), objectId: joi.string().trim().hex().length(24).required() });
export const GET_ADMIN_ALERTS_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }), market: joi.string().trim().valid(constant.setting.meta.markets), target: joi.string().trim(), page: joi.number().default(1), limit: joi.number().default(20) });


// CUSTOMER
export const CREATE_ADMIN_CUSTOMER_PAYLOAD = joi.object().keys({ password: joi.string().trim().min(4).max(8).required(), type: joi.string().trim().valid(["user", "admin"]), name: joi.string().trim(), mobile: joi.string().trim().regex(/^[0-9]+/), email: joi.string().trim(), amount: joi.string().trim().regex(/^[0-9]{1,15}(\.[0-9]{1,8})?$/), location: joi.string().trim(), handler: joi.string().trim(), start: joi.date().required(), end: joi.date().required(), allowed: joi.string().trim(), limit: joi.string().trim(), device: joi.string().trim().valid(["mobile", "web", "all"]) });
export const LOGIN_PAYLOAD = joi.object().keys({ userId: joi.string().trim().length(10).required(), password: joi.string().trim().min(4).max(8).required() });
export const UPDATE_USER_CUSTOMER_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), name: joi.string().trim(), mobile: joi.string().trim().regex(/^[0-9]+/), email: joi.string().trim(), location: joi.string().trim() });
export const UPDATE_ADMIN_CUSTOMER_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), password: joi.string().trim().min(4).max(8), name: joi.string().trim(), mobile: joi.string().trim().regex(/^[0-9]+/), email: joi.string().trim(), amount: joi.string().trim().regex(/^[0-9]{1,15}(\.[0-9]{1,8})?$/), location: joi.string().trim(), handler: joi.string().trim(), start: joi.date(), end: joi.date(), allowed: joi.string().trim(), limit: joi.string().trim(), freeze: joi.boolean() });
export const CHANGE_PASSWORD_USER_CUSTOMER_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required(), oldpassword: joi.string().trim().min(4).max(8).required(), newpassword: joi.string().trim().min(4).max(8).required() });
export const GET_USER_CUSTOMER_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required() });
export const GET_ADMIN_CUSTOMER_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }).required() });
export const GET_ADMIN_CUSTOMERS_PAYLOAD = joi.object().keys({ customerId: joi.string().trim().guid({ version: ["uuidv1"] }), userId: joi.string().trim().length(10), type: joi.string().trim().valid(["user", "admin"]), location: joi.string().trim(), handler: joi.string().trim(), page: joi.number().default(1), limit: joi.number().default(20) });

// PLAN => mongo
export const CREATE_ADMIN_PLAN_PAYLOAD = joi.object().keys({ name: joi.string().trim().required(), price: joi.string().required() });
export const DELETE_ADMIN_PLAN_PAYLOAD = joi.object().keys({ objectId: joi.string().trim().hex().length(24).required() });
export const GET_ADMIN_PLAN_PAYLOAD = joi.object().keys({ objectId: joi.string().trim().hex().length(24).required() });
export const GET_ADMIN_PLANS_PAYLOAD = joi.object().keys({ page: joi.number().default(1), limit: joi.number().default(20) });


