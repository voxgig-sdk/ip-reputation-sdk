// Typed models for the IpReputation SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Detail is the typed data model for the detail entity.
type Detail struct {
	Abuse *map[string]any `json:"abuse,omitempty"`
	AbuseScore *float64 `json:"abuse_score,omitempty"`
	Asn *map[string]any `json:"asn,omitempty"`
	Company *map[string]any `json:"company,omitempty"`
	ElapsedM *float64 `json:"elapsed_m,omitempty"`
	Fact *map[string]any `json:"fact,omitempty"`
	Ip *string `json:"ip,omitempty"`
	IsAbuser *bool `json:"is_abuser,omitempty"`
	IsBogon *bool `json:"is_bogon,omitempty"`
	IsDatacenter *bool `json:"is_datacenter,omitempty"`
	IsProxy *bool `json:"is_proxy,omitempty"`
	IsVpn *bool `json:"is_vpn,omitempty"`
	Known *bool `json:"known,omitempty"`
	Location *map[string]any `json:"location,omitempty"`
	NonResidentialForced *bool `json:"non_residential_forced,omitempty"`
	NonResidentialScore *float64 `json:"non_residential_score,omitempty"`
	Rir *string `json:"rir,omitempty"`
}

// DetailLoadMatch is the typed request payload for Detail.LoadTyped.
type DetailLoadMatch struct {
	Id string `json:"id"`
}

// IpReputation is the typed data model for the ip_reputation entity.
type IpReputation struct {
}

// IpReputationLoadMatch is the typed request payload for IpReputation.LoadTyped.
type IpReputationLoadMatch struct {
	Ip string `json:"ip"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
