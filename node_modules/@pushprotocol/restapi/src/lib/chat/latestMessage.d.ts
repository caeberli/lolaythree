import { AccountEnvOptionsType } from '../types';
/**
 *  GET /v1/chat/conversationhash/:threadhash
*/
export interface LatestMessagesOptionsType extends AccountEnvOptionsType {
    threadhash: string;
    pgpPrivateKey?: string;
}
export declare const latest: (options: LatestMessagesOptionsType) => Promise<import("../types").IMessageIPFS[]>;
