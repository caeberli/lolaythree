import { AccountEnvOptionsType, ConversationHashOptionsType } from '../../types';
declare type CreateUserOptionsType = {
    user: string;
    publicKey?: string;
    encryptedPrivateKey?: string;
    encryptionType?: string;
    signature?: string;
    sigType?: string;
    env?: string;
};
export declare const createUserService: (options: CreateUserOptionsType) => Promise<any>;
export declare const getConversationHashService: (options: ConversationHashOptionsType) => Promise<string>;
export interface GetMessagesOptionsType extends Omit<AccountEnvOptionsType, "account"> {
    threadhash: string;
    limit: number;
}
export declare const getMessagesService: (options: GetMessagesOptionsType) => Promise<any>;
export {};
