import { IConnectedUser, IFeeds, IMessageIPFSWithCID } from '../../types';
interface IEncryptedRequest {
    message: string;
    encryptionType: 'PlainText' | 'pgp';
    aesEncryptedSecret: string;
    signature: string;
}
export declare const encryptAndSign: ({ plainText, fromPublicKeyArmored, toPublicKeyArmored, privateKeyArmored, }: {
    plainText: string;
    fromPublicKeyArmored: string;
    toPublicKeyArmored: string;
    privateKeyArmored: string;
}) => Promise<{
    cipherText: string;
    encryptedSecret: string;
    signature: string;
    sigType: string;
    encType: string;
}>;
export declare const decryptAndVerifySignature: ({ cipherText, encryptedSecretKey, publicKeyArmored, signatureArmored, privateKeyArmored, }: {
    cipherText: string;
    encryptedSecretKey: string;
    publicKeyArmored: string;
    signatureArmored: string;
    privateKeyArmored: string;
}) => Promise<string>;
export declare const decryptFeeds: ({ feeds, connectedUser, }: {
    feeds: IFeeds[];
    connectedUser: IConnectedUser;
}) => Promise<IFeeds[]>;
interface IDecryptMessage {
    savedMsg: IMessageIPFSWithCID;
    connectedUser: IConnectedUser;
    account: string;
    chainId: number;
    currentChat: IFeeds;
    inbox: IFeeds[];
}
export declare const decryptMessages: ({ savedMsg, connectedUser, account, currentChat, inbox, }: IDecryptMessage) => Promise<IMessageIPFSWithCID>;
export declare const getEncryptedRequest: (receiverAddress: string, senderCreatedUser: IConnectedUser, message: string, env: string) => Promise<IEncryptedRequest | void>;
export {};
