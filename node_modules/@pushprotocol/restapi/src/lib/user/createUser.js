"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const tslib_1 = require("tslib");
const helpers_1 = require("../chat/helpers");
const constants_1 = require("../constants");
const helpers_2 = require("../helpers");
const helpers_3 = require("../helpers");
/*
  POST /v1/users/
*/
const create = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { env = constants_1.default.ENV.PROD, account } = options || {};
    if (!(0, helpers_2.isValidETHAddress)(account)) {
        throw new Error(`Invalid address!`);
    }
    const keyPairs = yield (0, helpers_1.generateKeyPair)();
    const walletPublicKey = yield (0, helpers_3.getPublicKey)(account);
    const encryptedPrivateKey = (0, helpers_2.encryptWithRPCEncryptionPublicKeyReturnRawData)(keyPairs.privateKeyArmored, walletPublicKey);
    const caip10 = (0, helpers_2.walletToPCAIP10)(account);
    const body = {
        user: caip10,
        publicKey: keyPairs.publicKeyArmored,
        encryptedPrivateKey: JSON.stringify(encryptedPrivateKey),
        encryptionType: 'x25519-xsalsa20-poly1305',
        signature: 'xyz',
        sigType: 'a',
        env
    };
    return (0, helpers_1.createUserService)(body);
});
exports.create = create;
//# sourceMappingURL=createUser.js.map