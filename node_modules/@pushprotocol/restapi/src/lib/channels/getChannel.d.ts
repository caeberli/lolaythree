/**
 *  GET /v1/channels/{addressinCAIP}
 */
export declare type GetChannelOptionsType = {
    channel: string;
    env?: string;
};
export declare const getChannel: (options: GetChannelOptionsType) => Promise<any>;
