# IpReputation Lua SDK Reference

Complete API reference for the IpReputation Lua SDK.


## IpReputationSDK

### Constructor

```lua
local sdk = require("ip-reputation_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Detail(data)`

Create a new `Detail` entity instance. Pass `nil` for no initial data.

#### `IpReputation(data)`

Create a new `IpReputation` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## DetailEntity

```lua
local detail = client:Detail(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abuse` | `table` | No | Abuse contact information |
| `abuse_score` | `number` | No | Numeric abuse score from 0 to 1. |
| `asn` | `table` | No | Autonomous System Number profile |
| `company` | `table` | No | Network owner profile |
| `elapsed_ms` | `number` | No | Server-side lookup time in milliseconds |
| `facts` | `table` | No | Reputation facts for the address when available |
| `id` | `string` | No |  |
| `ip` | `string` | No | Queried IPv4 address |
| `is_abuser` | `boolean` | No | Address currently associated with abuse activity |
| `is_bogon` | `boolean` | No | Reserved or unrouted address space |
| `is_datacenter` | `boolean` | No | Datacenter or hosting infrastructure |
| `is_proxy` | `boolean` | No | Proxy infrastructure |
| `is_vpn` | `boolean` | No | VPN infrastructure |
| `known` | `boolean` | No | Whether the address has current reputation signals |
| `location` | `table` | No | Approximate geolocation information |
| `non_residential_forced` | `boolean` | No | Whether the address is explicitly classified as non-residential |
| `non_residential_score` | `number` | No | Numeric score for non-residential infrastructure |
| `rir` | `string` | No | Regional Internet Registry |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Detail():load({ id = "detail_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DetailEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## IpReputationEntity

```lua
local ip_reputation = client:IpReputation(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:IpReputation():load({ ip = "ip" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IpReputationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

