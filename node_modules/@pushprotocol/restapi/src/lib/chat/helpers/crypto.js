"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEncryptedRequest = exports.decryptMessages = exports.decryptFeeds = exports.decryptAndVerifySignature = exports.encryptAndSign = void 0;
const tslib_1 = require("tslib");
const PGP = require("./pgp");
const AES = require("./aes");
const ethers_1 = require("ethers");
const user_1 = require("../../user");
const helpers_1 = require("../../helpers");
const service_1 = require("./service");
const encryptAndSign = ({ plainText, fromPublicKeyArmored, toPublicKeyArmored, privateKeyArmored, }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const secretKey = AES.generateRandomSecret(15);
    const cipherText = AES.aesEncrypt({ plainText, secretKey });
    const encryptedSecret = yield PGP.pgpEncrypt({
        plainText: secretKey,
        fromPublicKeyArmored,
        toPublicKeyArmored,
    });
    const signature = yield PGP.sign({
        message: cipherText,
        signingKey: privateKeyArmored,
    });
    return {
        cipherText,
        encryptedSecret,
        signature,
        sigType: 'pgp',
        encType: 'pgp',
    };
});
exports.encryptAndSign = encryptAndSign;
const decryptAndVerifySignature = ({ cipherText, encryptedSecretKey, publicKeyArmored, signatureArmored, privateKeyArmored, }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // const privateKeyArmored: string = await DIDHelper.decrypt(JSON.parse(encryptedPrivateKeyArmored), did)
    const secretKey = yield PGP.pgpDecrypt({
        cipherText: encryptedSecretKey,
        toPrivateKeyArmored: privateKeyArmored,
    });
    yield PGP.verifySignature({
        messageContent: cipherText,
        signatureArmored,
        publicKeyArmored,
    });
    return AES.aesDecrypt({ cipherText, secretKey });
});
exports.decryptAndVerifySignature = decryptAndVerifySignature;
const decryptFeeds = ({ feeds, connectedUser, }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (connectedUser.privateKey) {
        for (const feed of feeds) {
            if (feed.msg.encType !== 'PlainText' && feed.msg.encType !== null) {
                // To do signature verification it depends on who has sent the message
                let signatureValidationPubliKey;
                if (feed.msg.fromCAIP10 === connectedUser.wallets.split(',')[0]) {
                    signatureValidationPubliKey = connectedUser.publicKey;
                }
                else {
                    signatureValidationPubliKey = feed.publicKey;
                }
                feed.msg.lastMessage = yield (0, exports.decryptAndVerifySignature)({
                    cipherText: feed.msg.lastMessage,
                    encryptedSecretKey: feed.msg.encryptedSecret,
                    publicKeyArmored: signatureValidationPubliKey,
                    signatureArmored: feed.msg.signature,
                    privateKeyArmored: connectedUser.privateKey,
                });
            }
        }
    }
    return feeds;
});
exports.decryptFeeds = decryptFeeds;
const decryptMessages = ({ savedMsg, connectedUser, account, currentChat, inbox, }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (connectedUser.privateKey) {
        if (savedMsg.encType !== 'PlainText' && savedMsg.encType !== null) {
            // To do signature verification it depends on who has sent the message
            let signatureValidationPubliKey = '';
            if (savedMsg.fromCAIP10 === (0, helpers_1.walletToPCAIP10)(account)) {
                signatureValidationPubliKey = connectedUser.publicKey;
            }
            else {
                if (!currentChat.publicKey) {
                    const latestUserInfo = inbox.find((x) => x.wallets.split(',')[0] === currentChat.wallets.split(',')[0]);
                    if (latestUserInfo) {
                        signatureValidationPubliKey = latestUserInfo.publicKey;
                    }
                }
                else {
                    signatureValidationPubliKey = currentChat.publicKey;
                }
            }
            savedMsg.messageContent = yield (0, exports.decryptAndVerifySignature)({
                cipherText: savedMsg.messageContent,
                encryptedSecretKey: savedMsg.encryptedSecret,
                privateKeyArmored: connectedUser.privateKey,
                publicKeyArmored: signatureValidationPubliKey,
                signatureArmored: savedMsg.signature,
            });
        }
    }
    return savedMsg;
});
exports.decryptMessages = decryptMessages;
const getEncryptedRequest = (receiverAddress, senderCreatedUser, message, env) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const receiverCreatedUser = yield (0, user_1.get)({
        account: receiverAddress,
        env,
    });
    if (!(receiverCreatedUser === null || receiverCreatedUser === void 0 ? void 0 : receiverCreatedUser.publicKey)) {
        if (!ethers_1.ethers.utils.isAddress(receiverAddress)) {
            throw new Error(`Invalid receiver address!`);
        }
        yield (0, service_1.createUserService)({
            user: receiverAddress,
            publicKey: '',
            encryptedPrivateKey: '',
            encryptionType: '',
            signature: 'pgp',
            sigType: 'pgp',
            env,
        });
        // If the user is being created here, that means that user don't have a PGP keys. So this intent will be in plaintext
        return {
            message: message,
            encryptionType: 'PlainText',
            aesEncryptedSecret: '',
            signature: '',
        };
    }
    else {
        // It's possible for a user to be created but the PGP keys still not created
        if (!receiverCreatedUser.publicKey.includes('-----BEGIN PGP PUBLIC KEY BLOCK-----')) {
            return {
                message: message,
                encryptionType: 'PlainText',
                aesEncryptedSecret: '',
                signature: '',
            };
        }
        else {
            const { cipherText, encryptedSecret, signature, } = yield (0, exports.encryptAndSign)({
                plainText: message,
                toPublicKeyArmored: receiverCreatedUser.publicKey,
                fromPublicKeyArmored: senderCreatedUser.publicKey,
                privateKeyArmored: senderCreatedUser.privateKey,
            });
            return {
                message: cipherText,
                encryptionType: 'pgp',
                aesEncryptedSecret: encryptedSecret,
                signature: signature,
            };
        }
    }
});
exports.getEncryptedRequest = getEncryptedRequest;
//# sourceMappingURL=crypto.js.map