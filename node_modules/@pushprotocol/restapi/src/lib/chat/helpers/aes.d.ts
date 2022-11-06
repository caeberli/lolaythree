export declare const aesEncrypt: ({ plainText, secretKey }: {
    plainText: string;
    secretKey: string;
}) => string;
export declare const aesDecrypt: ({ cipherText, secretKey }: {
    cipherText: string;
    secretKey: string;
}) => string;
export declare const generateRandomSecret: (length: number) => string;
