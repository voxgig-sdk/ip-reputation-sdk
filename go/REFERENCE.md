# IpReputation Golang SDK Reference

Complete API reference for the IpReputation Golang SDK.


## IpReputationSDK

### Constructor

```go
func NewIpReputationSDK(options map[string]any) *IpReputationSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *IpReputationSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *IpReputationSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Detail(data map[string]any) IpReputationEntity`

Create a new `Detail` entity instance. Pass `nil` for no initial data.

#### `IpReputation(data map[string]any) IpReputationEntity`

Create a new `IpReputation` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## DetailEntity

```go
detail := client.Detail(nil)
fmt.Println(detail.GetName()) // "detail"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abuse` | `map[string]any` | No |  |
| `abuse_score` | `float64` | No |  |
| `asn` | `map[string]any` | No |  |
| `company` | `map[string]any` | No |  |
| `elapsed_ms` | `float64` | No |  |
| `facts` | `map[string]any` | No |  |
| `ip` | `string` | No |  |
| `is_abuser` | `bool` | No |  |
| `is_bogon` | `bool` | No |  |
| `is_datacenter` | `bool` | No |  |
| `is_proxy` | `bool` | No |  |
| `is_vpn` | `bool` | No |  |
| `known` | `bool` | No |  |
| `location` | `map[string]any` | No |  |
| `non_residential_forced` | `bool` | No |  |
| `non_residential_score` | `float64` | No |  |
| `rir` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Detail(nil).Load(map[string]any{"id": "detail_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DetailEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## IpReputationEntity

```go
ipReputation := client.IpReputation(nil)
fmt.Println(ipReputation.GetName()) // "ip_reputation"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.IpReputation(nil).Load(map[string]any{"ip": "ip"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IpReputationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewIpReputationSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

