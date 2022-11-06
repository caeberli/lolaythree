"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseApiResponse = void 0;
/**
 * @description parse the response gotten from the API
 * @param {ApiNotificationType[]} response
 * @returns {ParsedResponseType[]}
 */
function parseApiResponse(response) {
    return response.map((apiNotification) => {
        const { payload: { data: { acta: cta = "", amsg: bigMessage = "", asub = "", icon = "", url = "", sid = "", app = "", aimg = "", secret = "" }, notification, }, source, } = apiNotification;
        return {
            cta,
            title: asub || notification.title || '',
            message: bigMessage || notification.body || '',
            icon,
            url,
            sid,
            app,
            image: aimg,
            blockchain: source,
            notification,
            secret
        };
    });
}
exports.parseApiResponse = parseApiResponse;
//# sourceMappingURL=parseAPI.js.map