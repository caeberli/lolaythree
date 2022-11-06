declare type SignerType = {
    _signTypedData: (domain: unknown, types: unknown, value: unknown) => Promise<string>;
};
export declare type SubscribeOptionsType = {
    signer: SignerType;
    channelAddress: string;
    userAddress: string;
    verifyingContractAddress?: string;
    env?: string;
    onSuccess?: () => void;
    onError?: (err: Error) => void;
};
export declare const subscribe: (options: SubscribeOptionsType) => Promise<{
    status: string;
    message: string;
}>;
export {};
