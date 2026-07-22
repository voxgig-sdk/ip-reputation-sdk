<?php
declare(strict_types=1);

// Typed models for the IpReputation SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Detail entity data model. */
class Detail
{
    public ?array $abuse = null;
    public ?float $abuse_score = null;
    public ?array $asn = null;
    public ?array $company = null;
    public ?float $elapsed_m = null;
    public ?array $fact = null;
    public ?string $ip = null;
    public ?bool $is_abuser = null;
    public ?bool $is_bogon = null;
    public ?bool $is_datacenter = null;
    public ?bool $is_proxy = null;
    public ?bool $is_vpn = null;
    public ?bool $known = null;
    public ?array $location = null;
    public ?bool $non_residential_forced = null;
    public ?float $non_residential_score = null;
    public ?string $rir = null;
}

/** Request payload for Detail#load. */
class DetailLoadMatch
{
    public string $id;
}

/** IpReputation entity data model. */
class IpReputation
{
}

/** Request payload for IpReputation#load. */
class IpReputationLoadMatch
{
    public string $ip;
}

