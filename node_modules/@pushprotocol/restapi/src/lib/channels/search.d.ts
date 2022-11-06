/**
 *  GET /v1/channels/search/
 *  optional params: page=(1)&limit=(20{min:1}{max:30})&query=(searchquery)
 *
 */
export declare type SearchChannelOptionsType = {
    query: string;
    env?: string;
    page?: number;
    limit?: number;
};
export declare const search: (options: SearchChannelOptionsType) => Promise<any>;
