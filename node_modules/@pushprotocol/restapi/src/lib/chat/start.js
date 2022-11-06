"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const helpers_1 = require("../helpers");
const constants_1 = require("../constants");
const helpers_2 = require("./helpers");
/**
 *  POST /v1/chat/request
 */
const start = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { messageContent = '', messageType = 'Text', receiverAddress, connectedUser, apiKey = '', env = constants_1.default.ENV.PROD, } = options || {};
    const { message, encryptionType, aesEncryptedSecret, signature } = (yield (0, helpers_2.getEncryptedRequest)(receiverAddress, connectedUser, messageContent, env)) || {};
    const API_BASE_URL = (0, helpers_1.getAPIBaseUrls)(env);
    const apiEndpoint = `${API_BASE_URL}/v1/chat/request`;
    const headers = {
        'authorization': `Bearer ${apiKey}`,
    };
    const body = {
        fromDID: connectedUser.wallets.split(',')[0],
        toDID: (0, helpers_1.walletToPCAIP10)(receiverAddress),
        fromCAIP10: connectedUser.wallets.split(',')[0],
        toCAIP10: (0, helpers_1.walletToPCAIP10)(receiverAddress),
        messageContent: message,
        messageType,
        signature,
        encType: encryptionType,
        encryptedSecret: aesEncryptedSecret,
        sigType: signature,
    };
    return axios_1.default
        .post(apiEndpoint, body, { headers })
        .then((response) => {
        return response.data;
    })
        .catch((err) => {
        throw new Error(err);
    });
});
exports.start = start;
//# sourceMappingURL=start.js.map