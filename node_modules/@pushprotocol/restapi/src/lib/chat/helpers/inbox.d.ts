import { Chat, IMessageIPFS, IUser } from '../../types';
declare type InboxListsType = {
    lists: Chat[];
    user: string;
    toDecrypt: boolean;
    pgpPrivateKey?: string;
    env?: string;
};
declare type DecryptConverationType = {
    messages: IMessageIPFS[];
    connectedUser: IUser;
    toDecrypt: boolean;
    pgpPrivateKey?: string;
    env?: string;
};
export declare const getInboxLists: (options: InboxListsType) => Promise<IMessageIPFS[]>;
export declare const decryptConversation: (options: DecryptConverationType) => Promise<IMessageIPFS[]>;
export {};
