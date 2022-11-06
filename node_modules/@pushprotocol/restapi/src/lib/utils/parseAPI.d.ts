import { ApiNotificationType, ParsedResponseType } from '../types';
/**
 * @description parse the response gotten from the API
 * @param {ApiNotificationType[]} response
 * @returns {ParsedResponseType[]}
 */
export declare function parseApiResponse(response: ApiNotificationType[]): ParsedResponseType[];
