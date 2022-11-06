"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptAndVerifySignature = exports.decryptMessage = exports.decryptWithWalletRPCMethod = exports.encryptWithRPCEncryptionPublicKeyReturnRawData = exports.getPublicKey = void 0;
const tslib_1 = require("tslib");
const metamaskSigUtil = require("@metamask/eth-sig-util");
const helpers_1 = require("../chat/helpers");
const address_1 = require("./address");
const getPublicKey = (account) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.log('Fetching Public Key');
    const keyB64 = yield window.ethereum.request({
        method: 'eth_getEncryptionPublicKey',
        params: [account], // you must have access to the specified account
    });
    console.log(`Public Key: ${keyB64}`);
    return keyB64;
});
exports.getPublicKey = getPublicKey;
const encryptWithRPCEncryptionPublicKeyReturnRawData = (text, encryptionPublicKey) => {
    const encryptedSecret = metamaskSigUtil.encrypt({
        publicKey: encryptionPublicKey,
        data: text,
        version: 'x25519-xsalsa20-poly1305'
    });
    return encryptedSecret;
};
exports.encryptWithRPCEncryptionPublicKeyReturnRawData = encryptWithRPCEncryptionPublicKeyReturnRawData;
const decryptWithWalletRPCMethod = (encryptedMessage, account) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!(0, address_1.isValidETHAddress)(account))
        throw new Error(`Invalid address!`);
    const result = yield window.ethereum.request({
        method: 'eth_decrypt',
        params: [encryptedMessage, account],
    });
    return result;
});
exports.decryptWithWalletRPCMethod = decryptWithWalletRPCMethod;
const decryptMessage = ({ encryptedMessage, encryptionType, encryptedSecret, pgpPrivateKey, signature, signatureValidationPubliKey }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let plainText;
    if (encryptionType !== 'PlainText' && encryptionType !== null) {
        plainText = yield (0, exports.decryptAndVerifySignature)({
            cipherText: encryptedMessage,
            encryptedSecretKey: encryptedSecret,
            privateKeyArmored: pgpPrivateKey,
            publicKeyArmored: signatureValidationPubliKey,
            signatureArmored: signature,
        });
    }
    else {
        plainText = encryptedMessage;
    }
    return plainText;
});
exports.decryptMessage = decryptMessage;
const decryptAndVerifySignature = ({ cipherText, encryptedSecretKey, publicKeyArmored, signatureArmored, privateKeyArmored }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // const privateKeyArmored: string = await DIDHelper.decrypt(JSON.parse(encryptedPrivateKeyArmored), did)
    const secretKey = yield (0, helpers_1.pgpDecrypt)({
        cipherText: encryptedSecretKey,
        toPrivateKeyArmored: privateKeyArmored
    });
    yield (0, helpers_1.verifySignature)({ messageContent: cipherText, signatureArmored, publicKeyArmored });
    return (0, helpers_1.aesDecrypt)({ cipherText, secretKey });
});
exports.decryptAndVerifySignature = decryptAndVerifySignature;
//# sourceMappingURL=crypto.js.map