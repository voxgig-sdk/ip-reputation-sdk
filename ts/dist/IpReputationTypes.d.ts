export interface Detail {
    abuse?: Record<string, any>;
    abuse_score?: number;
    asn?: Record<string, any>;
    company?: Record<string, any>;
    elapsed_ms?: number;
    facts?: Record<string, any>;
    id?: string;
    ip?: string;
    is_abuser?: boolean;
    is_bogon?: boolean;
    is_datacenter?: boolean;
    is_proxy?: boolean;
    is_vpn?: boolean;
    known?: boolean;
    location?: Record<string, any>;
    non_residential_forced?: boolean;
    non_residential_score?: number;
    rir?: string;
}
export interface DetailLoadMatch {
    id: string;
}
export interface IpReputation {
}
export interface IpReputationLoadMatch {
    ip: string;
}
