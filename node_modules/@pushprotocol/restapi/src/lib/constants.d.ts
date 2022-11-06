declare const Constants: {
    ENV: {
        PROD: string;
        STAGING: string;
        DEV: string;
    };
    PAGINATION: {
        INITIAL_PAGE: number;
        LIMIT: number;
        LIMIT_MIN: number;
        LIMIT_MAX: number;
    };
    DEFAULT_CHAIN_ID: number;
    DEV_CHAIN_ID: number;
    NON_ETH_CHAINS: number[];
    ETH_CHAINS: number[];
};
export default Constants;
