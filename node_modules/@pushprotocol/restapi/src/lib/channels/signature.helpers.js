"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeInformation = exports.getSubscriptionMessage = exports.getDomainInformation = void 0;
const getDomainInformation = (chainId, verifyingContract) => {
    return {
        name: "EPNS COMM V1",
        chainId,
        verifyingContract,
    };
};
exports.getDomainInformation = getDomainInformation;
const getSubscriptionMessage = (channel, userAddress, action) => {
    const actionTypeKey = (action === "Unsubscribe") ? "unsubscriber" : "subscriber";
    return {
        channel,
        [actionTypeKey]: userAddress,
        action: action,
    };
};
exports.getSubscriptionMessage = getSubscriptionMessage;
const getTypeInformation = (action) => {
    if (action === "Subscribe") {
        return {
            Subscribe: [
                { name: "channel", type: "address" },
                { name: "subscriber", type: "address" },
                { name: "action", type: "string" },
            ],
        };
    }
    return {
        Unsubscribe: [
            { name: "channel", type: "address" },
            { name: "unsubscriber", type: "address" },
            { name: "action", type: "string" },
        ],
    };
};
exports.getTypeInformation = getTypeInformation;
//# sourceMappingURL=signature.helpers.js.map