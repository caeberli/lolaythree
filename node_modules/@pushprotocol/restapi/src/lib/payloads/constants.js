"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTIFICATION_TYPE = exports.IDENTITY_TYPE = exports.SOURCE_TYPES = exports.CHAIN_ID_TO_SOURCE = void 0;
exports.CHAIN_ID_TO_SOURCE = {
    1: "ETH_MAINNET",
    5: "ETH_TEST_GOERLI",
    137: "POLYGON_MAINNET",
    80001: "POLYGON_TEST_MUMBAI",
};
exports.SOURCE_TYPES = {
    ETH_MAINNET: 'ETH_MAINNET',
    ETH_TEST_GOERLI: 'ETH_TEST_GOERLI',
    POLYGON_MAINNET: 'POLYGON_MAINNET',
    POLYGON_TEST_MUMBAI: 'POLYGON_TEST_MUMBAI',
    THE_GRAPH: 'THE_GRAPH'
};
exports.IDENTITY_TYPE = {
    MINIMAL: 0,
    IPFS: 1,
    DIRECT_PAYLOAD: 2,
    SUBGRAPH: 3
};
exports.NOTIFICATION_TYPE = {
    BROADCAST: 1,
    TARGETTED: 3,
    SUBSET: 4
};
//# sourceMappingURL=constants.js.map