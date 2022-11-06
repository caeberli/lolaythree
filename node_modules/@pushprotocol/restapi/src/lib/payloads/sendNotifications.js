"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const helpers_1 = require("./helpers");
const helpers_2 = require("../helpers");
const constants_1 = require("./constants");
/**
 * Validate options for some scenarios
 */
function validateOptions(options) {
    if (!(options === null || options === void 0 ? void 0 : options.channel)) {
        throw '[EPNS-SDK] - Error - sendNotification() - "channel" is mandatory!';
    }
    /**
     * Apart from IPFS, GRAPH use cases "notification", "payload" is mandatory
     */
    if ((options === null || options === void 0 ? void 0 : options.identityType) === constants_1.IDENTITY_TYPE.DIRECT_PAYLOAD || (options === null || options === void 0 ? void 0 : options.identityType) === constants_1.IDENTITY_TYPE.MINIMAL) {
        if (!options.notification) {
            throw '[EPNS-SDK] - Error - sendNotification() - "notification" mandatory for Identity Type: Direct Payload, Minimal!';
        }
        if (!options.payload) {
            throw '[EPNS-SDK] - Error - sendNotification() - "payload" mandatory for Identity Type: Direct Payload, Minimal!';
        }
    }
}
function sendNotification(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const { signer, type, identityType, payload, recipients, channel, graph, ipfsHash, env = 'prod' } = options || {};
            validateOptions(options);
            const _channelAddress = (0, helpers_2.getCAIPAddress)(env, channel, 'Channel');
            const channelCAIPDetails = (0, helpers_2.getCAIPDetails)(_channelAddress);
            if (!channelCAIPDetails)
                throw Error('Invalid Channel CAIP!');
            const uuid = (0, helpers_1.getUUID)();
            const chainId = parseInt(channelCAIPDetails.networkId, 10);
            const { API_BASE_URL, EPNS_COMMUNICATOR_CONTRACT } = (0, helpers_2.getConfig)(env, channelCAIPDetails);
            const _recipients = yield (0, helpers_1.getRecipients)({
                env,
                notificationType: type,
                channel: _channelAddress,
                recipients,
                secretType: payload === null || payload === void 0 ? void 0 : payload.sectype
            });
            const notificationPayload = (0, helpers_1.getPayloadForAPIInput)(options, _recipients);
            const verificationProof = yield (0, helpers_1.getVerificationProof)({
                signer,
                chainId,
                identityType,
                notificationType: type,
                verifyingContract: EPNS_COMMUNICATOR_CONTRACT,
                payload: notificationPayload,
                graph,
                ipfsHash,
                uuid
            });
            const identity = (0, helpers_1.getPayloadIdentity)({
                identityType,
                payload: notificationPayload,
                notificationType: type,
                graph,
                ipfsHash
            });
            const source = (0, helpers_1.getSource)(chainId, identityType);
            const apiPayload = {
                verificationProof,
                identity,
                sender: _channelAddress,
                source,
                /** note this recipient key has a different expectation from the BE API, see the funciton for more */
                recipient: (0, helpers_1.getRecipientFieldForAPIPayload)({
                    env,
                    notificationType: type,
                    recipients: recipients || '',
                    channel: _channelAddress
                })
            };
            const requestURL = `${API_BASE_URL}/v1/payloads/`;
            console.log('\n\nAPI call :-->> ', requestURL, '\n\n', apiPayload, '\n\n\n\n');
            return yield axios_1.default.post(requestURL, apiPayload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        catch (err) {
            console.error('[EPNS-SDK] - Error - sendNotification() - ', JSON.stringify(err));
            throw err;
        }
    });
}
exports.sendNotification = sendNotification;
//# sourceMappingURL=sendNotifications.js.map