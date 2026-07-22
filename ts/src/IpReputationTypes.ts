// Typed models for the IpReputation SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Detail {
  abuse?: Record<string, any>
  abuse_score?: number
  asn?: Record<string, any>
  company?: Record<string, any>
  elapsed_m?: number
  fact?: Record<string, any>
  ip?: string
  is_abuser?: boolean
  is_bogon?: boolean
  is_datacenter?: boolean
  is_proxy?: boolean
  is_vpn?: boolean
  known?: boolean
  location?: Record<string, any>
  non_residential_forced?: boolean
  non_residential_score?: number
  rir?: string
}

export interface DetailLoadMatch {
  id: string
}

export interface IpReputation {
}

export interface IpReputationLoadMatch {
  ip: string
}

