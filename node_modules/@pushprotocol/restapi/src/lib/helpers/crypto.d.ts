import * as metamaskSigUtil from "@metamask/eth-sig-util";
export declare const getPublicKey: (account: string) => Promise<string>;
export declare const encryptWithRPCEncryptionPublicKeyReturnRawData: (text: string, encryptionPublicKey: string) => metamaskSigUtil.EthEncryptedData;
export declare const decryptWithWalletRPCMethod: (encryptedMessage: string, account: string) => Promise<any>;
export declare const decryptMessage: ({ encryptedMessage, encryptionType, encryptedSecret, pgpPrivateKey, signature, signatureValidationPubliKey }: {
    encryptedMessage: string;
    encryptionType: string;
    encryptedSecret: string;
    pgpPrivateKey: string;
    signature: string;
    signatureValidationPubliKey: string;
}) => Promise<string>;
export declare const decryptAndVerifySignature: ({ cipherText, encryptedSecretKey, publicKeyArmored, signatureArmored, privateKeyArmored }: {
    cipherText: string;
    encryptedSecretKey: string;
    publicKeyArmored: string;
    signatureArmored: string;
    privateKeyArmored: string;
}) => Promise<string>;
