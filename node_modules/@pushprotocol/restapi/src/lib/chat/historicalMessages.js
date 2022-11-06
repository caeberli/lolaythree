"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.history = void 0;
const tslib_1 = require("tslib");
const constants_1 = require("../constants");
const helpers_1 = require("../helpers");
const user_1 = require("../user");
const helpers_2 = require("./helpers");
/**
 *  GET /v1/chat/conversationhash/:threadhash
*/
var FetchLimit;
(function (FetchLimit) {
    FetchLimit[FetchLimit["MIN"] = 1] = "MIN";
    FetchLimit[FetchLimit["DEFAULT"] = 10] = "DEFAULT";
    FetchLimit[FetchLimit["MAX"] = 30] = "MAX";
})(FetchLimit || (FetchLimit = {}));
const history = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { threadhash, limit = FetchLimit.DEFAULT, pgpPrivateKey = '', account, env = constants_1.default.ENV.PROD, } = options || {};
    try {
        if (limit < FetchLimit.MIN || limit > FetchLimit.MAX) {
            if (limit < FetchLimit.MIN)
                throw new Error(`Limit must be more than equal to ${FetchLimit.MIN}`);
            else
                throw new Error(`Limit must be less than equal to ${FetchLimit.MAX}`);
        }
        const messages = yield (0, helpers_2.getMessagesService)({ threadhash, limit, env });
        const connectedUser = yield (0, user_1.get)({ account: (0, helpers_1.pCAIP10ToWallet)(account), env });
        return yield (0, helpers_2.decryptConversation)({ messages, connectedUser, toDecrypt: true, pgpPrivateKey, env });
    }
    catch (err) {
        console.error(`[EPNS-SDK] - API fetchMessages -: `, err);
        throw Error(`[EPNS-SDK] - API fetchMessages -: ${err}`);
    }
});
exports.history = history;
//# sourceMappingURL=historicalMessages.js.map