import { IpReputationEntityBase } from '../IpReputationEntityBase';
import type { IpReputationSDK } from '../IpReputationSDK';
import type { Control } from '../types';
import type { Detail, DetailLoadMatch } from '../IpReputationTypes';
declare class DetailEntity extends IpReputationEntityBase<Detail> {
    constructor(client: IpReputationSDK, entopts: any);
    make(this: DetailEntity): DetailEntity;
    load(this: any, reqmatch?: DetailLoadMatch, ctrl?: Control): Promise<DetailEntity>;
}
export { DetailEntity };
