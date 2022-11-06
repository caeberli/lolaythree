export interface Message {
    fromCAIP10: string;
    toCAIP10: string;
    fromDID: string;
    toDID: string;
    messageType: string;
    messageContent: string;
    signature: string;
    sigType: string;
    timestamp?: number;
    encType: string;
    encryptedSecret: string;
    link: string | null;
}
export interface IPFSOptionsType {
    env?: string;
}
/**
 * This function internally
 * @param cid
 * @returns
 */
export declare function getCID(cid: string, options: IPFSOptionsType): Promise<Message>;
