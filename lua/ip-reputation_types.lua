-- Typed models for the IpReputation SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Detail
---@field abuse? table
---@field abuse_score? number
---@field asn? table
---@field company? table
---@field elapsed_ms? number
---@field facts? table
---@field ip? string
---@field is_abuser? boolean
---@field is_bogon? boolean
---@field is_datacenter? boolean
---@field is_proxy? boolean
---@field is_vpn? boolean
---@field known? boolean
---@field location? table
---@field non_residential_forced? boolean
---@field non_residential_score? number
---@field rir? string

---@class DetailLoadMatch
---@field id string

---@class IpReputation

---@class IpReputationLoadMatch
---@field ip string

local M = {}

return M
