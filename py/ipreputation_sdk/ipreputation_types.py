# Typed models for the IpReputation SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Detail(TypedDict, total=False):
    abuse: dict
    abuse_score: float
    asn: dict
    company: dict
    elapsed_ms: float
    facts: dict
    ip: str
    is_abuser: bool
    is_bogon: bool
    is_datacenter: bool
    is_proxy: bool
    is_vpn: bool
    known: bool
    location: dict
    non_residential_forced: bool
    non_residential_score: float
    rir: str


class DetailLoadMatch(TypedDict):
    id: str


class IpReputation(TypedDict):
    pass


class IpReputationLoadMatch(TypedDict):
    ip: str
