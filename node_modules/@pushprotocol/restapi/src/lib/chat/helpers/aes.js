"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomSecret = exports.aesDecrypt = exports.aesEncrypt = void 0;
const CryptoJS = require("crypto-js");
const aesEncrypt = ({ plainText, secretKey }) => {
    return CryptoJS.AES.encrypt(plainText, secretKey).toString();
};
exports.aesEncrypt = aesEncrypt;
const aesDecrypt = ({ cipherText, secretKey }) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};
exports.aesDecrypt = aesDecrypt;
const generateRandomSecret = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.generateRandomSecret = generateRandomSecret;
//# sourceMappingURL=aes.js.map