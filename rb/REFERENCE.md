# IpReputation Ruby SDK Reference

Complete API reference for the IpReputation Ruby SDK.


## IpReputationSDK

### Constructor

```ruby
require_relative 'IpReputation_sdk'

client = IpReputationSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IpReputationSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = IpReputationSDK.test
```


### Instance Methods

#### `Detail(data = nil)`

Create a new `Detail` entity instance. Pass `nil` for no initial data.

#### `IpReputation(data = nil)`

Create a new `IpReputation` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## DetailEntity

```ruby
detail = client.Detail
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abuse` | `Hash` | No |  |
| `abuse_score` | `Float` | No |  |
| `asn` | `Hash` | No |  |
| `company` | `Hash` | No |  |
| `elapsed_ms` | `Float` | No |  |
| `facts` | `Hash` | No |  |
| `ip` | `String` | No |  |
| `is_abuser` | `Boolean` | No |  |
| `is_bogon` | `Boolean` | No |  |
| `is_datacenter` | `Boolean` | No |  |
| `is_proxy` | `Boolean` | No |  |
| `is_vpn` | `Boolean` | No |  |
| `known` | `Boolean` | No |  |
| `location` | `Hash` | No |  |
| `non_residential_forced` | `Boolean` | No |  |
| `non_residential_score` | `Float` | No |  |
| `rir` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Detail.load({ "id" => "detail_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DetailEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IpReputationEntity

```ruby
ip_reputation = client.IpReputation
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.IpReputation.load({ "ip" => "ip" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IpReputationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = IpReputationSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

