// Typed models for the IpReputation SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/ip-reputation-sdk/go/core"
)

// Detail is the typed data model for the detail entity.
type Detail struct {
	Abuse *map[string]any `json:"abuse,omitempty"`
	AbuseScore *float64 `json:"abuse_score,omitempty"`
	Asn *map[string]any `json:"asn,omitempty"`
	Company *map[string]any `json:"company,omitempty"`
	ElapsedMs *float64 `json:"elapsed_ms,omitempty"`
	Facts *map[string]any `json:"facts,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
