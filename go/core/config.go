package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "IpReputation",
			"slug": "ip-reputation",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.netbait.org",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"detail": map[string]any{},
				"ip_reputation": map[string]any{},
			},
		},
		"entity": map[string]any{
			"detail": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "abuse",
						"short": "Abuse contact information",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "float",
						"name": "abuse_score",
						"short": "Numeric abuse score from 0 to 1.",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "asn",
						"short": "Autonomous System Number profile",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "company",
						"short": "Network owner profile",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "float",
						"name": "elapsed_ms",
						"short": "Server-side lookup time in milliseconds",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "facts",
						"short": "Reputation facts for the address when available",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"short": "Queried IPv4 address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "is_abuser",
						"short": "Address currently associated with abuse activity",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_bogon",
						"short": "Reserved or unrouted address space",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_datacenter",
						"short": "Datacenter or hosting infrastructure",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_proxy",
						"short": "Proxy infrastructure",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_vpn",
						"short": "VPN infrastructure",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "known",
						"short": "Whether the address has current reputation signals",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "location",
						"short": "Approximate geolocation information",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "non_residential_forced",
						"short": "Whether the address is explicitly classified as non-residential",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"format": "float",
						"name": "non_residential_score",
						"short": "Numeric score for non-residential infrastructure",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "rir",
						"short": "Regional Internet Registry",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "detail",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "1.1.1.1",
											"kind": "param",
											"name": "id",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/detail/{ip}",
								"rename": map[string]any{
									"param": map[string]any{
										"ip": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "detail",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"v1",
									"detail",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"ip_reputation": map[string]any{
				"fields": []any{},
				"name": "ip_reputation",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "8.8.8.8",
											"kind": "param",
											"name": "ip",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/score/{ip}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "score",
									},
									map[string]any{
										"var": "ip",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"v1",
									"score",
									"{ip}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"score",
						},
					},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
