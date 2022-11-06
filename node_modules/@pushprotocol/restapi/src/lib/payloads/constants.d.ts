export interface ChainIdToSourceType {
    [key: number]: string;
}
export declare const CHAIN_ID_TO_SOURCE: ChainIdToSourceType;
export declare const SOURCE_TYPES: {
    ETH_MAINNET: string;
    ETH_TEST_GOERLI: string;
    POLYGON_MAINNET: string;
    POLYGON_TEST_MUMBAI: string;
    THE_GRAPH: string;
};
export declare const IDENTITY_TYPE: {
    MINIMAL: number;
    IPFS: number;
    DIRECT_PAYLOAD: number;
    SUBGRAPH: number;
};
export declare const NOTIFICATION_TYPE: {
    BROADCAST: number;
    TARGETTED: number;
    SUBSET: number;
};
