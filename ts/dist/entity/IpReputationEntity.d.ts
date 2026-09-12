import { IpReputationEntityBase } from '../IpReputationEntityBase';
import type { IpReputationSDK } from '../IpReputationSDK';
import type { Control } from '../types';
import type { IpReputation, IpReputationLoadMatch } from '../IpReputationTypes';
declare class IpReputationEntity extends IpReputationEntityBase<IpReputation> {
    constructor(client: IpReputationSDK, entopts: any);
    make(this: IpReputationEntity): IpReputationEntity;
    load(this: any, reqmatch?: IpReputationLoadMatch, ctrl?: Control): Promise<IpReputationEntity>;
}
export { IpReputationEntity };
