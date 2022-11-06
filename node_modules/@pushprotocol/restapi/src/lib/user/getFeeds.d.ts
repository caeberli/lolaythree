/**
 *  GET '/v1/users/:userAddressInCAIP/feeds
 *  optional params: page=(1)&limit=(20{min=1|max=50})&spam=(false)'
 */
export declare type FeedsOptionsType = {
    user: string;
    env?: string;
    page?: number;
    limit?: number;
    spam?: boolean;
    raw?: boolean;
};
export declare const getFeeds: (options: FeedsOptionsType) => Promise<any>;
