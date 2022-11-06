"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCID = void 0;
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const constants_1 = require("../constants");
const helpers_1 = require("../helpers");
/**
 * This function internally
 * @param cid
 * @returns
 */
function getCID(cid, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { env = constants_1.default.ENV.PROD, } = options || {};
        const API_BASE_URL = (0, helpers_1.getAPIBaseUrls)(env);
        const apiEndpoint = `${API_BASE_URL}/v1/ipfs/${cid}`;
        const requestUrl = `${apiEndpoint}`;
        try {
            const response = yield axios_1.default.get(requestUrl);
            const message = response.data;
            return message;
        }
        catch (err) {
            console.error(`[EPNS-SDK] - API ${requestUrl}: `, err);
            throw Error(`[EPNS-SDK] - API ${requestUrl}: ${err}`);
        }
    });
}
exports.getCID = getCID;
//# sourceMappingURL=ipfs.js.map