/**
 *  GET /users/:userAddressInCAIP/subscriptions
 */
export declare type UserSubscriptionsOptionsType = {
    user: string;
    env?: string;
};
export declare const getSubscriptions: (options: UserSubscriptionsOptionsType) => Promise<any>;
