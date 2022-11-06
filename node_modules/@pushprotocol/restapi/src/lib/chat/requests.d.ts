import { Message } from './ipfs';
/**
 *  GET '/v1/chat/users/:did/requests
 */
export declare type RequestOptionsType = {
    account: string;
    pgpPrivateKey?: string;
    env?: string;
};
export declare const requests: (options: RequestOptionsType) => Promise<Message[]>;
