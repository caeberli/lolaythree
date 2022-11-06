"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectedUser = exports.createUserIfNecessary = void 0;
const tslib_1 = require("tslib");
const constants_1 = require("../../constants");
const user_1 = require("../../user");
const helpers_1 = require("../../helpers");
const createUserIfNecessary = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { account, env = constants_1.default.ENV.PROD } = options || {};
    const connectedUser = yield (0, user_1.get)({ account: account, env });
    if (!(connectedUser === null || connectedUser === void 0 ? void 0 : connectedUser.encryptedPrivateKey)) {
        const createdUser = yield (0, user_1.create)({ account: account, env });
        return createdUser;
    }
    else {
        return connectedUser;
    }
});
exports.createUserIfNecessary = createUserIfNecessary;
const getConnectedUser = (account, privateKey, env) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_1.get)({ account: account, env: env || constants_1.default.ENV.PROD });
    if (user === null || user === void 0 ? void 0 : user.encryptedPrivateKey) {
        if (privateKey) {
            return Object.assign(Object.assign({}, user), { privateKey });
        }
        else {
            throw new Error(`Decrypted private key required as input`);
        }
    }
    else {
        const newUser = yield (0, user_1.create)({ account, env });
        const decryptedPrivateKey = yield (0, helpers_1.decryptWithWalletRPCMethod)(newUser.encryptedPrivateKey, account);
        return Object.assign(Object.assign({}, newUser), { privateKey: decryptedPrivateKey });
    }
});
exports.getConnectedUser = getConnectedUser;
//# sourceMappingURL=user.js.map