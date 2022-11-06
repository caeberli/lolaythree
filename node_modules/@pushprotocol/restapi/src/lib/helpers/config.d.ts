import { ConfigType } from '../config';
/**
 * This config helper returns the API url as well as the
 * EPNS communicator contract method address
 */
export declare const getConfig: (env: string, { blockchain, networkId }: {
    blockchain: string;
    networkId: string;
}) => ConfigType;
/**
 * This config helper returns only the API urls
 */
export declare function getAPIBaseUrls(env: string): string;
