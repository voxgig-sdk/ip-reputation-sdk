import { Context } from './Context';
declare class IpReputationError extends Error {
    isIpReputationError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { IpReputationError };
