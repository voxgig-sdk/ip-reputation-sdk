import { DetailEntity } from './entity/DetailEntity';
import { IpReputationEntity } from './entity/IpReputationEntity';
export type * from './IpReputationTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { IpReputationEntityBase } from './IpReputationEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class IpReputationSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Detail(entopts?: Record<string, any>): DetailEntity;
    IpReputation(entopts?: Record<string, any>): IpReputationEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): IpReputationSDK;
    tester(testopts?: any, sdkopts?: any): IpReputationSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof IpReputationSDK;
export { stdutil, config, BaseFeature, IpReputationEntityBase, IpReputationSDK, SDK, };
