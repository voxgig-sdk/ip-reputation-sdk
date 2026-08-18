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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "abuse_score",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "asn",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "company",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "elapsed_ms",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "facts",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "ip",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "is_abuser",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_bogon",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_datacenter",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_proxy",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_vpn",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "known",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "location",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "non_residential_forced",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "non_residential_score",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "rir",
						"type": "`$STRING`",
					},
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
								"parts": []any{
									"v1",
									"detail",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ip": "id",
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
								"parts": []any{
									"v1",
									"score",
									"{ip}",
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
