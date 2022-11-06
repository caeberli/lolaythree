"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAPIBaseUrls = exports.getConfig = void 0;
const config_1 = require("../config");
/**
 * This config helper returns the API url as well as the
 * EPNS communicator contract method address
 */
const getConfig = (env, { blockchain, networkId }) => {
    const blockchainSelector = `${blockchain}:${networkId}`;
    const configuration = config_1.default[env][blockchainSelector];
    if (!configuration) {
        throw Error(`
      [EPNS-SDK] - cannot determine config for 
        env: ${env},
        blockchain: ${blockchain},
        networkId: ${networkId}
    `);
    }
    return configuration;
};
exports.getConfig = getConfig;
/**
 * This config helper returns only the API urls
 */
function getAPIBaseUrls(env) {
    if (!env)
        throw Error('ENV not provided!');
    return config_1.API_BASE_URL[env];
}
exports.getAPIBaseUrls = getAPIBaseUrls;
//# sourceMappingURL=config.js.map