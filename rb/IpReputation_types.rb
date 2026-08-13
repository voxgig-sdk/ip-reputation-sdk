# frozen_string_literal: true

# Typed models for the IpReputation SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Detail entity data model.
#
# @!attribute [rw] abuse
#   @return [Hash, nil]
#
# @!attribute [rw] abuse_score
#   @return [Float, nil]
#
# @!attribute [rw] asn
#   @return [Hash, nil]
#
# @!attribute [rw] company
#   @return [Hash, nil]
#
# @!attribute [rw] elapsed_ms
#   @return [Float, nil]
#
# @!attribute [rw] facts
#   @return [Hash, nil]
#
# @!attribute [rw] ip
#   @return [String, nil]
#
# @!attribute [rw] is_abuser
#   @return [Boolean, nil]
#
# @!attribute [rw] is_bogon
#   @return [Boolean, nil]
#
# @!attribute [rw] is_datacenter
#   @return [Boolean, nil]
#
# @!attribute [rw] is_proxy
#   @return [Boolean, nil]
#
# @!attribute [rw] is_vpn
#   @return [Boolean, nil]
#
# @!attribute [rw] known
#   @return [Boolean, nil]
#
# @!attribute [rw] location
#   @return [Hash, nil]
#
# @!attribute [rw] non_residential_forced
#   @return [Boolean, nil]
#
# @!attribute [rw] non_residential_score
#   @return [Float, nil]
#
# @!attribute [rw] rir
#   @return [String, nil]
Detail = Struct.new(
  :abuse,
  :abuse_score,
  :asn,
  :company,
  :elapsed_ms,
  :facts,
  :ip,
  :is_abuser,
  :is_bogon,
  :is_datacenter,
  :is_proxy,
  :is_vpn,
  :known,
  :location,
  :non_residential_forced,
  :non_residential_score,
  :rir,
  keyword_init: true
)

# Request payload for Detail#load.
#
# @!attribute [rw] id
#   @return [String]
DetailLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# IpReputation entity data model.
class IpReputation
end

# Request payload for IpReputation#load.
#
# @!attribute [rw] ip
#   @return [String]
IpReputationLoadMatch = Struct.new(
  :ip,
  keyword_init: true
)

