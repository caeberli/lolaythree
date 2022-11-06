declare type channelActionType = "Unsubscribe" | "Subscribe";
export declare const getDomainInformation: (chainId: number, verifyingContract: string) => {
    name: string;
    chainId: number;
    verifyingContract: string;
};
export declare const getSubscriptionMessage: (channel: string, userAddress: string, action: channelActionType) => {
    [x: string]: string;
    channel: string;
    action: channelActionType;
};
export declare const getTypeInformation: (action: string) => {
    Subscribe: {
        name: string;
        type: string;
    }[];
    Unsubscribe?: undefined;
} | {
    Unsubscribe: {
        name: string;
        type: string;
    }[];
    Subscribe?: undefined;
};
export {};
