"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.latest = void 0;
const tslib_1 = require("tslib");
const constants_1 = require("../constants");
const historicalMessages_1 = require("./historicalMessages");
const latest = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { threadhash, pgpPrivateKey = '', account, env = constants_1.default.ENV.PROD, } = options || {};
    return (0, historicalMessages_1.history)({ threadhash, limit: 1, pgpPrivateKey, account, env });
});
exports.latest = latest;
//# sourceMappingURL=latestMessage.js.map