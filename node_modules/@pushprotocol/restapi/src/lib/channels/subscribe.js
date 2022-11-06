"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribe = void 0;
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const helpers_1 = require("../helpers");
const signature_helpers_1 = require("./signature.helpers");
const constants_1 = require("../constants");
const subscribe = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { signer, channelAddress, userAddress, verifyingContractAddress, env = constants_1.default.ENV.PROD, onSuccess, onError, } = options || {};
    try {
        const _channelAddress = (0, helpers_1.getCAIPAddress)(env, channelAddress, 'Channel');
        const channelCAIPDetails = (0, helpers_1.getCAIPDetails)(_channelAddress);
        if (!channelCAIPDetails)
            throw Error('Invalid Channel CAIP!');
        const chainId = parseInt(channelCAIPDetails.networkId, 10);
        const _userAddress = (0, helpers_1.getCAIPAddress)(env, userAddress, 'User');
        const userCAIPDetails = (0, helpers_1.getCAIPDetails)(_userAddress);
        if (!userCAIPDetails)
            throw Error('Invalid User CAIP!');
        const { API_BASE_URL, EPNS_COMMUNICATOR_CONTRACT } = (0, helpers_1.getConfig)(env, channelCAIPDetails);
        const requestUrl = `${API_BASE_URL}/v1/channels/${_channelAddress}/subscribe`;
        // get domain information
        const domainInformation = (0, signature_helpers_1.getDomainInformation)(chainId, verifyingContractAddress || EPNS_COMMUNICATOR_CONTRACT);
        // get type information
        const typeInformation = (0, signature_helpers_1.getTypeInformation)("Subscribe");
        // get message
        const messageInformation = (0, signature_helpers_1.getSubscriptionMessage)(channelCAIPDetails.address, userCAIPDetails.address, "Subscribe");
        // sign a message using EIP712
        const signature = yield signer._signTypedData(domainInformation, typeInformation, messageInformation);
        const verificationProof = signature; // might change
        const body = {
            verificationProof,
            message: Object.assign(Object.assign({}, messageInformation), { channel: _channelAddress, subscriber: _userAddress }),
        };
        yield axios_1.default.post(requestUrl, body);
        if (typeof onSuccess === 'function')
            onSuccess();
        return { status: "success", message: "successfully opted into channel" };
    }
    catch (err) {
        if (typeof onError === 'function')
            onError(err);
        return { status: "error", message: err instanceof Error ? err.message : JSON.stringify(err) };
    }
});
exports.subscribe = subscribe;
//# sourceMappingURL=subscribe.js.map