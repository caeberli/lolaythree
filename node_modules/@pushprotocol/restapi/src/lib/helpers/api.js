"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLimit = exports.getQueryParams = void 0;
const constants_1 = require("../constants");
function getQueryParams(obj) {
    return Object.keys(obj)
        .map(key => {
        return `${key}=${encodeURIComponent(obj[key])}`;
    })
        .join('&');
}
exports.getQueryParams = getQueryParams;
function getLimit(passedLimit) {
    if (!passedLimit)
        return constants_1.default.PAGINATION.LIMIT;
    // if (passedLimit > Constants.PAGINATION.LIMIT_MAX) {
    //   return Constants.PAGINATION.LIMIT_MAX;
    // }
    return passedLimit;
}
exports.getLimit = getLimit;
//# sourceMappingURL=api.js.map