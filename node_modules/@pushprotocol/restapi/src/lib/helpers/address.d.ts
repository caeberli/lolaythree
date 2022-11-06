export interface AddressValidatorsType {
    [key: string]: ({ address }: {
        address: string;
    }) => boolean;
}
export declare function isValidETHAddress(address: string): boolean;
export declare function validateCAIP(addressInCAIP: string): boolean;
export declare type CAIPDetailsType = {
    blockchain: string;
    networkId: string;
    address: string;
};
export declare function getCAIPDetails(addressInCAIP: string): CAIPDetailsType | null;
export declare function getFallbackETHCAIPAddress(env: string, address: string): string;
/**
 * This helper
 *  checks if a VALID CAIP
 *    return the CAIP
 *  else
 *    check if valid ETH
 *      return a CAIP representation of that address (EIP155 + env)
 *    else
 *      throw error!
 */
export declare function getCAIPAddress(env: string, address: string, msg?: string): string;
export declare const walletToPCAIP10: (account: string) => string;
export declare const pCAIP10ToWallet: (wallet: string) => string;
