import { EventType, Filter, Listener } from '@ethersproject/abstract-provider';
import { EthersEvent } from './ethers-event';
import { LogsEvent, LogsSubscriptionFilter, NewHeadsEvent } from './websocket-backfiller';
/** This file contains internal types used by the SDK and are not exposed to the end user. */
declare type JsonRpcId = string | number | null;
/**
 * Prefix for `alchemy_pendingTransactions` subscriptions when serializing to
 * ethers events.
 *
 * This tag is used internally by ethers to track different event filters.
 */
export declare const ALCHEMY_PENDING_TRANSACTIONS_EVENT_TYPE = "alchemy-pending-transactions";
/**
 * Prefix for `alchemy_minedTransactions` subscriptions when serializing to ethers events.
 *
 * This tag is used internally by ethers to track different event filters.
 */
export declare const ALCHEMY_MINED_TRANSACTIONS_EVENT_TYPE = "alchemy-mined-transactions";
/**
 * Array containing all the custom event tags used internally by ethers to track
 * event filters.
 */
export declare const ALCHEMY_EVENT_TYPES: string[];
export interface JsonRpcRequest {
    jsonrpc: '2.0';
    method: string;
    params?: any[];
    id?: JsonRpcId;
}
export interface VirtualSubscription {
    event: EthersEvent;
    virtualId: string;
    physicalId: string;
    method: string;
    params: any[];
    isBackfilling: boolean;
    startingBlockNumber: number;
    sentEvents: any[];
    backfillBuffer: any[];
}
export interface JsonRpcResponse<T = any> {
    jsonrpc: '2.0';
    result?: T;
    error?: JsonRpcError;
    id: JsonRpcId;
}
interface JsonRpcError<T = any> {
    code: number;
    message: string;
    data?: T;
}
export interface NewHeadsSubscription extends VirtualSubscription {
    method: 'eth_subscribe';
    params: ['newHeads'];
    isBackfilling: boolean;
    sentEvents: NewHeadsEvent[];
    backfillBuffer: NewHeadsEvent[];
}
export interface LogsSubscription extends VirtualSubscription {
    method: 'eth_subscribe';
    params: ['logs', LogsSubscriptionFilter?];
    isBackfilling: boolean;
    sentEvents: LogsEvent[];
    backfillBuffer: LogsEvent[];
}
export declare type WebSocketMessage = SingleOrBatchResponse | SubscriptionEvent;
export declare type SingleOrBatchResponse = JsonRpcResponse | JsonRpcResponse[];
export interface SubscriptionEvent<T = any> {
    jsonrpc: '2.0';
    method: 'eth_subscription';
    params: {
        subscription: string;
        result: T;
    };
}
/**
 * DO NOT MODIFY.
 *
 * Event class copied directly over from ethers.js's `BaseProvider` class.
 *
 * This class is used to represent events and their corresponding listeners. The
 * SDK needs to extend this class in order to support Alchemy's custom
 * Subscription API types. The original class is not exported by ethers. Minimal
 * changes have been made in order to get TS to compile.
 */
export declare class Event {
    readonly listener: Listener;
    readonly once: boolean;
    readonly tag: string;
    _lastBlockNumber: number;
    _inflight: boolean;
    constructor(tag: string, listener: Listener, once: boolean);
    get event(): EventType;
    get type(): string;
    get hash(): string;
    get filter(): Filter;
    pollable(): boolean;
}
export {};
