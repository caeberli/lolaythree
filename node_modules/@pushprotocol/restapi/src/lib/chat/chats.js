"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chats = void 0;
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const helpers_1 = require("../helpers");
const constants_1 = require("../constants");
const helpers_2 = require("./helpers");
// Only get the chats not the intent
const chats = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { account, pgpPrivateKey, env = constants_1.default.ENV.PROD } = options || {};
    const user = (0, helpers_1.walletToPCAIP10)(account);
    const API_BASE_URL = (0, helpers_1.getAPIBaseUrls)(env);
    const apiEndpoint = `${API_BASE_URL}/v1/chat/users/${user}/chats`;
    const requestUrl = `${apiEndpoint}`;
    try {
        if (!(0, helpers_1.isValidETHAddress)(user)) {
            throw new Error(`Invalid address!`);
        }
        const response = yield axios_1.default.get(requestUrl);
        const chats = response.data.chats;
        const messages = yield (0, helpers_2.getInboxLists)({
            lists: chats,
            user,
            toDecrypt: true,
            pgpPrivateKey,
            env,
        });
        return messages;
    }
    catch (err) {
        console.error(`[EPNS-SDK] - API ${requestUrl}: `, err);
        throw Error(`[EPNS-SDK] - API ${requestUrl}: ${err}`);
    }
});
exports.chats = chats;
//# sourceMappingURL=chats.js.map