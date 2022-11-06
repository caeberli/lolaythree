import { ChatOptionsType } from '../types';
/**
 *  POST /v1/chat/request
 */
export declare const start: (options: Omit<ChatOptionsType, 'account'>) => Promise<any>;
