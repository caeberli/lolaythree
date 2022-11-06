"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const helpers_1 = require("../helpers");
const constants_1 = require("../constants");
const search = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { query, env = constants_1.default.ENV.PROD, page = constants_1.default.PAGINATION.INITIAL_PAGE, limit = constants_1.default.PAGINATION.LIMIT, } = options || {};
    if (!query)
        throw Error('"query" not provided!');
    const API_BASE_URL = (0, helpers_1.getAPIBaseUrls)(env);
    const apiEndpoint = `${API_BASE_URL}/v1/channels/search/`;
    const queryObj = {
        page,
        limit: (0, helpers_1.getLimit)(limit),
        query: query
    };
    const requestUrl = `${apiEndpoint}?${(0, helpers_1.getQueryParams)(queryObj)}`;
    return axios_1.default.get(requestUrl)
        .then((response) => response.data.channels)
        .catch((err) => {
        console.error(`[EPNS-SDK] - API ${requestUrl}: `, err);
    });
});
exports.search = search;
//# sourceMappingURL=search.js.map