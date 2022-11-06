import { ISendNotificationInputOptions, INotificationPayload } from '../types';
export declare function getUUID(): string;
/**
 * This function will map the Input options passed to the SDK to the "payload" structure
 * needed by the API input
 *
 * We need notificationPayload only for identityType
 *  - DIRECT_PAYLOAD
 *  - MINIMAL
 */
export declare function getPayloadForAPIInput(inputOptions: ISendNotificationInputOptions, recipients: any): INotificationPayload | null;
/**
 * This function returns the recipient format accepted by the API for different notification types
 */
export declare function getRecipients({ env, notificationType, channel, recipients, secretType }: {
    env: string;
    notificationType: number;
    channel: string;
    recipients?: string | string[];
    secretType?: string;
}): Promise<string | string[] | {
    [x: string]: string;
} | undefined>;
export declare function getRecipientFieldForAPIPayload({ env, notificationType, recipients, channel, }: {
    env: string;
    notificationType: number;
    recipients: string | string[];
    channel: string;
}): string;
export declare function getVerificationProof({ signer, chainId, notificationType, identityType, verifyingContract, payload, ipfsHash, graph, uuid }: {
    signer: any;
    chainId: number;
    notificationType: number;
    identityType: number;
    verifyingContract: string;
    payload: any;
    ipfsHash?: string;
    graph?: any;
    uuid: string;
}): Promise<string | null>;
export declare function getPayloadIdentity({ identityType, payload, notificationType, ipfsHash, graph, }: {
    identityType: number;
    payload: any;
    notificationType?: number;
    ipfsHash?: string;
    graph?: any;
}): string | null;
export declare function getSource(chainId: number, identityType: number): string;
export declare function getCAIPFormat(chainId: number, address: string): string;
