"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannel = void 0;
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const helpers_1 = require("../helpers");
const constants_1 = require("../constants");
const getChannel = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { channel, env = constants_1.default.ENV.PROD, } = options || {};
    const _channel = (0, helpers_1.getCAIPAddress)(env, channel, 'Channel');
    const API_BASE_URL = (0, helpers_1.getAPIBaseUrls)(env);
    const apiEndpoint = `${API_BASE_URL}/v1/channels`;
    const requestUrl = `${apiEndpoint}/${_channel}`;
    return yield axios_1.default.get(requestUrl)
        .then((response) => response.data)
        .catch((err) => {
        console.error(`[EPNS-SDK] - API ${requestUrl}: `, err);
    });
});
exports.getChannel = getChannel;
//# sourceMappingURL=getChannel.js.map