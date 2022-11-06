"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pgpDecrypt = exports.verifySignature = exports.sign = exports.pgpEncrypt = exports.generateKeyPair = void 0;
const tslib_1 = require("tslib");
const openpgp = require("openpgp");
const generateKeyPair = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const keys = yield openpgp.generateKey({
        type: 'rsa',
        rsaBits: 2048,
        userIDs: [{ name: '', email: '' }]
    });
    return {
        privateKeyArmored: keys.privateKey,
        publicKeyArmored: keys.publicKey
    };
});
exports.generateKeyPair = generateKeyPair;
const pgpEncrypt = ({ plainText, toPublicKeyArmored, fromPublicKeyArmored }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const toPublicKey = yield openpgp.readKey({ armoredKey: toPublicKeyArmored });
    const fromPublicKey = yield openpgp.readKey({ armoredKey: fromPublicKeyArmored });
    const message = yield openpgp.createMessage({ text: plainText });
    const encrypted = yield openpgp.encrypt({
        message: message,
        encryptionKeys: [toPublicKey, fromPublicKey]
    });
    return encrypted;
});
exports.pgpEncrypt = pgpEncrypt;
const sign = ({ message, signingKey }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const messageObject = yield openpgp.createMessage({ text: message });
    const privateKey = yield openpgp.readPrivateKey({ armoredKey: signingKey });
    return yield openpgp.sign({ message: messageObject, signingKeys: privateKey, detached: true });
});
exports.sign = sign;
const verifySignature = ({ messageContent, signatureArmored, publicKeyArmored }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const message = yield openpgp.createMessage({ text: messageContent });
    const signature = yield openpgp.readSignature({
        armoredSignature: signatureArmored
    });
    const publicKey = yield openpgp.readKey({ armoredKey: publicKeyArmored });
    const verificationResult = yield openpgp.verify({
        message,
        signature,
        verificationKeys: publicKey
    });
    const { verified } = verificationResult.signatures[0];
    try {
        yield verified;
    }
    catch (e) {
        throw new Error('Signature could not be verified: ' + e);
    }
});
exports.verifySignature = verifySignature;
const pgpDecrypt = ({ cipherText, toPrivateKeyArmored }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const message = yield openpgp.readMessage({ armoredMessage: cipherText });
    const privateKey = yield openpgp.readPrivateKey({ armoredKey: toPrivateKeyArmored });
    const { data: decrypted } = yield openpgp.decrypt({
        message,
        decryptionKeys: privateKey
    });
    return decrypted;
});
exports.pgpDecrypt = pgpDecrypt;
//# sourceMappingURL=pgp.js.map