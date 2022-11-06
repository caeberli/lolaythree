"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCAIPFormat = exports.getSource = exports.getPayloadIdentity = exports.getVerificationProof = exports.getRecipientFieldForAPIPayload = exports.getRecipients = exports.getPayloadForAPIInput = exports.getUUID = void 0;
const tslib_1 = require("tslib");
const uuid_1 = require("uuid");
const helpers_1 = require("../helpers");
const constants_1 = require("./constants");
function getUUID() {
    return (0, uuid_1.v4)();
}
exports.getUUID = getUUID;
/**
 * This function will map the Input options passed to the SDK to the "payload" structure
 * needed by the API input
 *
 * We need notificationPayload only for identityType
 *  - DIRECT_PAYLOAD
 *  - MINIMAL
 */
function getPayloadForAPIInput(inputOptions, recipients) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    if ((inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.notification) && (inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.payload)) {
        return {
            notification: {
                title: (_a = inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.notification) === null || _a === void 0 ? void 0 : _a.title,
                body: (_b = inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.notification) === null || _b === void 0 ? void 0 : _b.body
            },
            data: Object.assign(Object.assign(Object.assign(Object.assign({ acta: ((_c = inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.payload) === null || _c === void 0 ? void 0 : _c.cta) || '', aimg: ((_d = inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.payload) === null || _d === void 0 ? void 0 : _d.img) || '', amsg: ((_e = inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.payload) === null || _e === void 0 ? void 0 : _e.body) || '', asub: ((_f = inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.payload) === null || _f === void 0 ? void 0 : _f.title) || '', type: ((_g = inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.type) === null || _g === void 0 ? void 0 : _g.toString()) || '' }, ((inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.expiry) && { etime: inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.expiry })), ((inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.hidden) && { hidden: inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.hidden })), (((_h = inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.payload) === null || _h === void 0 ? void 0 : _h.sectype) && { sectype: (_j = inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.payload) === null || _j === void 0 ? void 0 : _j.sectype })), (((_k = inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.payload) === null || _k === void 0 ? void 0 : _k.metadata) && { metadata: (_l = inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.payload) === null || _l === void 0 ? void 0 : _l.metadata })),
            recipients: recipients
        };
    }
    return null;
}
exports.getPayloadForAPIInput = getPayloadForAPIInput;
/**
 * This function returns the recipient format accepted by the API for different notification types
 */
function getRecipients({ env, notificationType, channel, recipients, secretType }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let addressInCAIP = '';
        if (secretType) {
            let secret = '';
            // return '';
            /**
             * Currently SECRET FLOW is yet to be finalized on the backend, so will revisit this later.
             * But in secret flow we basically generate secret for the address
             * and send it in { 0xtarget: secret_generated_for_0xtarget } format for all
             */
            if (notificationType === constants_1.NOTIFICATION_TYPE.TARGETTED) {
                if (typeof recipients === 'string') {
                    addressInCAIP = (0, helpers_1.getCAIPAddress)(env, recipients, 'Recipient');
                    secret = ''; // do secret stuff // TODO
                    return {
                        [addressInCAIP]: secret
                    };
                }
            }
            else if (notificationType === constants_1.NOTIFICATION_TYPE.SUBSET) {
                if (Array.isArray(recipients)) {
                    const recipientObject = recipients.reduce((_recipients, _rAddress) => {
                        addressInCAIP = (0, helpers_1.getCAIPAddress)(env, _rAddress, 'Recipient');
                        secret = ''; // do secret stuff // TODO
                        return Object.assign(Object.assign({}, _recipients), { [addressInCAIP]: secret });
                    }, {});
                    return recipientObject;
                }
            }
        }
        else {
            /**
             * NON-SECRET FLOW
             */
            if (notificationType === constants_1.NOTIFICATION_TYPE.BROADCAST) {
                if (!recipients) {
                    // return getCAIPFormat(chainId, channel || '');
                    return (0, helpers_1.getCAIPAddress)(env, channel, 'Recipient');
                }
            }
            else if (notificationType === constants_1.NOTIFICATION_TYPE.TARGETTED) {
                if (typeof recipients === 'string') {
                    return (0, helpers_1.getCAIPAddress)(env, recipients, 'Recipient');
                }
            }
            else if (notificationType === constants_1.NOTIFICATION_TYPE.SUBSET) {
                if (Array.isArray(recipients)) {
                    const recipientObject = recipients.reduce((_recipients, _rAddress) => {
                        addressInCAIP = (0, helpers_1.getCAIPAddress)(env, _rAddress, 'Recipient');
                        return Object.assign(Object.assign({}, _recipients), { [addressInCAIP]: null });
                    }, {});
                    return recipientObject;
                }
            }
        }
        return recipients;
    });
}
exports.getRecipients = getRecipients;
function getRecipientFieldForAPIPayload({ env, notificationType, recipients, channel, }) {
    if (notificationType === constants_1.NOTIFICATION_TYPE.TARGETTED && typeof recipients === 'string') {
        return (0, helpers_1.getCAIPAddress)(env, recipients, 'Recipient');
    }
    return (0, helpers_1.getCAIPAddress)(env, channel, 'Recipient');
}
exports.getRecipientFieldForAPIPayload = getRecipientFieldForAPIPayload;
function getVerificationProof({ signer, chainId, notificationType, identityType, verifyingContract, payload, ipfsHash, graph = {}, uuid }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // console.log('payload ---> \n\n', payload);
        const type = {
            Data: [{ name: 'data', type: 'string' }]
        };
        const domain = {
            name: 'EPNS COMM V1',
            chainId: chainId,
            verifyingContract: verifyingContract,
        };
        let message = null;
        let signature = null;
        if (identityType === constants_1.IDENTITY_TYPE.MINIMAL) {
            message = {
                data: `${identityType}+${notificationType}+${payload.notification.title}+${payload.notification.body}`,
            };
            signature = yield signer._signTypedData(domain, type, message);
            return `eip712v2:${signature}::uid::${uuid}`;
        }
        else if (identityType === constants_1.IDENTITY_TYPE.IPFS) {
            message = {
                data: `1+${ipfsHash}`,
            };
            signature = yield signer._signTypedData(domain, type, message);
            return `eip712v2:${signature}::uid::${uuid}`;
        }
        else if (identityType === constants_1.IDENTITY_TYPE.DIRECT_PAYLOAD) {
            const payloadJSON = JSON.stringify(payload);
            message = {
                data: `2+${payloadJSON}`,
            };
            signature = yield signer._signTypedData(domain, type, message);
            return `eip712v2:${signature}::uid::${uuid}`;
        }
        else if (identityType === constants_1.IDENTITY_TYPE.SUBGRAPH) {
            message = {
                data: `3+graph:${graph === null || graph === void 0 ? void 0 : graph.id}+${graph === null || graph === void 0 ? void 0 : graph.counter}`,
            };
            signature = yield signer._signTypedData(domain, type, message);
            return `eip712v2:${signature}::uid::${uuid}`;
        }
        return signature;
    });
}
exports.getVerificationProof = getVerificationProof;
function getPayloadIdentity({ identityType, payload, notificationType, ipfsHash, graph = {}, }) {
    if (identityType === constants_1.IDENTITY_TYPE.MINIMAL) {
        return `0+${notificationType}+${payload.notification.title}+${payload.notification.body}`;
    }
    else if (identityType === constants_1.IDENTITY_TYPE.IPFS) {
        return `1+${ipfsHash}`;
    }
    else if (identityType === constants_1.IDENTITY_TYPE.DIRECT_PAYLOAD) {
        const payloadJSON = JSON.stringify(payload);
        return `2+${payloadJSON}`;
    }
    else if (identityType === constants_1.IDENTITY_TYPE.SUBGRAPH) {
        return `3+graph:${graph === null || graph === void 0 ? void 0 : graph.id}+${graph === null || graph === void 0 ? void 0 : graph.counter}`;
    }
    return null;
}
exports.getPayloadIdentity = getPayloadIdentity;
function getSource(chainId, identityType) {
    if (identityType === constants_1.IDENTITY_TYPE.SUBGRAPH) {
        return constants_1.SOURCE_TYPES.THE_GRAPH;
    }
    return constants_1.CHAIN_ID_TO_SOURCE[chainId];
}
exports.getSource = getSource;
function getCAIPFormat(chainId, address) {
    // EVM based chains
    if ([1, 5, 42, 137, 80001].includes(chainId)) {
        return `eip155:${chainId}:${address}`;
    }
    return address;
    // TODO: add support for other non-EVM based chains
}
exports.getCAIPFormat = getCAIPFormat;
//# sourceMappingURL=helpers.js.map