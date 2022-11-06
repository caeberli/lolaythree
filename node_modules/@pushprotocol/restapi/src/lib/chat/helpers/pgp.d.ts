export declare const generateKeyPair: () => Promise<{
    privateKeyArmored: string;
    publicKeyArmored: string;
}>;
export declare const pgpEncrypt: ({ plainText, toPublicKeyArmored, fromPublicKeyArmored }: {
    plainText: string;
    toPublicKeyArmored: string;
    fromPublicKeyArmored: string;
}) => Promise<string>;
export declare const sign: ({ message, signingKey }: {
    message: string;
    signingKey: string;
}) => Promise<string>;
export declare const verifySignature: ({ messageContent, signatureArmored, publicKeyArmored }: {
    messageContent: string;
    signatureArmored: string;
    publicKeyArmored: string;
}) => Promise<void>;
export declare const pgpDecrypt: ({ cipherText, toPrivateKeyArmored }: {
    cipherText: any;
    toPrivateKeyArmored: string;
}) => Promise<string>;
