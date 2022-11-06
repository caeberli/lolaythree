"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._getSubscribers = void 0;
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const helpers_1 = require("../helpers");
const constants_1 = require("../constants");
/**
 * LEGACY SDK method, kept to support old functionality
 * can be removed if not needed in future.
 */
const deprecationWarning = `
 [EPNS-SDK]: _getSubscribers() Deprecation Warning!
 This method has been deprecated, please use the below alternatives
 if you need to,
  * to check if user is subscribed or not: user.getSubscriptions()
  * get channels count: channels.getChannels()
`;
const _getSubscribers = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.warn(deprecationWarning);
    const { channel, env = constants_1.default.ENV.PROD, } = options || {};
    const _channelAddress = (0, helpers_1.getCAIPAddress)(env, channel, 'Channel');
    const channelCAIPDetails = (0, helpers_1.getCAIPDetails)(_channelAddress);
    if (!channelCAIPDetails)
        throw Error('Invalid Channel CAIP!');
    const chainId = channelCAIPDetails.networkId;
    const API_BASE_URL = (0, helpers_1.getAPIBaseUrls)(env);
    const apiEndpoint = `${API_BASE_URL}/channels/_get_subscribers`;
    const requestUrl = `${apiEndpoint}`;
    const body = {
        channel: channelCAIPDetails.address,
        blockchain: chainId,
        op: "read"
    };
    const apiResponse = yield axios_1.default.post(requestUrl, body);
    const { data: { subscribers = [] } } = apiResponse;
    return subscribers;
});
exports._getSubscribers = _getSubscribers;
//# sourceMappingURL=_getSubscribers.js.map