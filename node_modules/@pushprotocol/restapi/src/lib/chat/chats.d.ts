import { Message } from './ipfs';
/**
 *  GET '/v1/chat/users/:did/chats
 */
export declare type ChatsOptionsType = {
    account: string;
    pgpPrivateKey?: string;
    env?: string;
};
export declare const chats: (options: ChatsOptionsType) => Promise<Message[]>;
