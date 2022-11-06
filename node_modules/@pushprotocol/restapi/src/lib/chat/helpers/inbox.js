"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptConversation = exports.getInboxLists = void 0;
const tslib_1 = require("tslib");
const constants_1 = require("../../constants");
const helpers_1 = require("../../helpers");
const user_1 = require("../../user");
const ipfs_1 = require("../ipfs");
const getInboxLists = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { lists, user, toDecrypt, pgpPrivateKey, env = constants_1.default.ENV.PROD, } = options || {};
    const connectedUser = yield (0, user_1.get)({ account: (0, helpers_1.pCAIP10ToWallet)(user), env });
    const messages = [];
    for (const list of lists) {
        if (list.threadhash !== null) {
            const message = yield (0, ipfs_1.getCID)(list.threadhash, { env });
            messages.push(message);
        }
    }
    return (0, exports.decryptConversation)({ messages, connectedUser, toDecrypt, pgpPrivateKey, env });
});
exports.getInboxLists = getInboxLists;
const decryptConversation = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { messages, connectedUser, toDecrypt, pgpPrivateKey, env = constants_1.default.ENV.PROD, } = options || {};
    let otherPeer;
    let signatureValidationPubliKey; // To do signature verification it depends on who has sent the message
    let gotOtherPeer = false;
    for (const message of messages) {
        if (message.encType !== 'PlainText') {
            if (!pgpPrivateKey) {
                throw Error('Decrypted private key is necessary');
            }
            if (message.fromCAIP10 !== connectedUser.wallets.split(',')[0]) {
                if (!gotOtherPeer) {
                    otherPeer = yield (0, user_1.get)({ account: message.fromCAIP10, env });
                    gotOtherPeer = true;
                }
                signatureValidationPubliKey = otherPeer.publicKey;
            }
            else {
                signatureValidationPubliKey = connectedUser.publicKey;
            }
            if (toDecrypt) {
                message.messageContent = yield (0, helpers_1.decryptMessage)({
                    encryptedMessage: message.messageContent,
                    encryptedSecret: message.encryptedSecret,
                    encryptionType: message.encType,
                    signature: message.signature,
                    signatureValidationPubliKey: signatureValidationPubliKey,
                    pgpPrivateKey,
                });
            }
        }
    }
    return messages;
});
exports.decryptConversation = decryptConversation;
//# sourceMappingURL=inbox.js.map