package core

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
						"active": true,
						"name": "abuse",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "abuse_score",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "asn",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "company",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "elapsed_m",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "fact",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "ip",
						"req": false,
						"type": "`$STRING`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "is_abuser",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "is_bogon",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 8,
					},
					map[string]any{
						"active": true,
						"name": "is_datacenter",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 9,
					},
					map[string]any{
						"active": true,
						"name": "is_proxy",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 10,
					},
					map[string]any{
						"active": true,
						"name": "is_vpn",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 11,
					},
					map[string]any{
						"active": true,
						"name": "known",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 12,
					},
					map[string]any{
						"active": true,
						"name": "location",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 13,
					},
					map[string]any{
						"active": true,
						"name": "non_residential_forced",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 14,
					},
					map[string]any{
						"active": true,
						"name": "non_residential_score",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 15,
					},
					map[string]any{
						"active": true,
						"name": "rir",
						"req": false,
						"type": "`$STRING`",
						"index$": 16,
					},
				},
				"name": "detail",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "1.1.1.1",
											"kind": "param",
											"name": "id",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
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
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "8.8.8.8",
											"kind": "param",
											"name": "ip",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
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
