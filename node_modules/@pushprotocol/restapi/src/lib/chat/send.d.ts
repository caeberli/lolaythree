import { ChatOptionsType } from '../types';
/**
 *  POST /v1/chat/message
 */
export declare const send: (options: Omit<ChatOptionsType, 'connectedUser'>) => Promise<any>;
