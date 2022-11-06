import { AccountEnvOptionsType } from '../types';
export interface HistoricalMessagesOptionsType extends AccountEnvOptionsType {
    threadhash: string;
    pgpPrivateKey?: string;
    limit?: number;
}
export declare const history: (options: HistoricalMessagesOptionsType) => Promise<import("../types").IMessageIPFS[]>;
