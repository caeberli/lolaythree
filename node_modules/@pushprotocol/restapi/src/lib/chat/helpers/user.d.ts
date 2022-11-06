import { AccountEnvOptionsType, IConnectedUser, IUser } from '../../types';
export declare const createUserIfNecessary: (options: AccountEnvOptionsType) => Promise<IUser>;
export declare const getConnectedUser: (account: string, privateKey: string | null, env: string) => Promise<IConnectedUser>;
