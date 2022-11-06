declare type SignerType = {
    _signTypedData: (domain: unknown, types: unknown, value: unknown) => Promise<string>;
};
export declare type UnSubscribeOptionsType = {
    signer: SignerType;
    channelAddress: string;
    userAddress: string;
    verifyingContractAddress?: string;
    env?: string;
    onSuccess?: () => void;
    onError?: (err: Error) => void;
};
export declare const unsubscribe: (options: UnSubscribeOptionsType) => Promise<{
    status: string;
    message: string;
}>;
export {};
