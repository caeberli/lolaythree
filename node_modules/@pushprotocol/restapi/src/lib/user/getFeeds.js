"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeeds = void 0;
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const helpers_1 = require("../helpers");
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const getFeeds = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { user, env = constants_1.default.ENV.PROD, page = constants_1.default.PAGINATION.INITIAL_PAGE, limit = constants_1.default.PAGINATION.LIMIT, spam = false, raw = false, } = options || {};
    const _user = (0, helpers_1.getCAIPAddress)(env, user, 'User');
    const API_BASE_URL = (0, helpers_1.getAPIBaseUrls)(env);
    const apiEndpoint = `${API_BASE_URL}/v1/users/${_user}/feeds`;
    const queryObj = {
        page,
        limit: (0, helpers_1.getLimit)(limit),
        spam
    };
    const requestUrl = `${apiEndpoint}?${(0, helpers_1.getQueryParams)(queryObj)}`;
    return axios_1.default.get(requestUrl)
        .then((response) => {
        var _a, _b;
        if (raw) {
            return ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.feeds) || [];
        }
        return (0, utils_1.parseApiResponse)((_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.feeds) || [];
    })
        .catch((err) => {
        console.error(`[EPNS-SDK] - API ${requestUrl}: `, err);
    });
});
exports.getFeeds = getFeeds;
//# sourceMappingURL=getFeeds.js.map