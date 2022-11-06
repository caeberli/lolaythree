export declare const API_BASE_URL: {
    [x: string]: string;
};
export interface ConfigType {
    API_BASE_URL: string;
    EPNS_COMMUNICATOR_CONTRACT: string;
}
declare const CONFIG: {
    [x: string]: {
        [x: string]: {
            API_BASE_URL: string;
            EPNS_COMMUNICATOR_CONTRACT: string;
        };
    };
};
export default CONFIG;
