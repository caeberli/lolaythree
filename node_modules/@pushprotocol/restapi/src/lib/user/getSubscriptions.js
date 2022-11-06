"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubscriptions = void 0;
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const helpers_1 = require("../helpers");
const constants_1 = require("../constants");
const getSubscriptions = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { user, env = constants_1.default.ENV.PROD, } = options || {};
    const _user = (0, helpers_1.getCAIPAddress)(env, user, 'User');
    const API_BASE_URL = (0, helpers_1.getAPIBaseUrls)(env);
    const apiEndpoint = `${API_BASE_URL}/v1/users/${_user}/subscriptions`;
    const requestUrl = `${apiEndpoint}`;
    return axios_1.default.get(requestUrl)
        .then((response) => { var _a; return ((_a = response.data) === null || _a === void 0 ? void 0 : _a.subscriptions) || []; })
        .catch((err) => {
        console.error(`[EPNS-SDK] - API ${requestUrl}: `, err);
    });
});
exports.getSubscriptions = getSubscriptions;
//# sourceMappingURL=getSubscriptions.js.map