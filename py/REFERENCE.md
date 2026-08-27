# IpReputation Python SDK Reference

Complete API reference for the IpReputation Python SDK.


## IpReputationSDK

### Constructor

```python
from ipreputation_sdk import IpReputationSDK

client = IpReputationSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IpReputationSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = IpReputationSDK.test()
```


### Instance Methods

#### `Detail(data=None)`

Create a new `DetailEntity` instance. Pass `None` for no initial data.

#### `IpReputation(data=None)`

Create a new `IpReputationEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## DetailEntity

```python
detail = client.Detail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abuse` | `dict` | No | Abuse contact information |
| `abuse_score` | `float` | No | Numeric abuse score from 0 to 1. |
| `asn` | `dict` | No | Autonomous System Number profile |
| `company` | `dict` | No | Network owner profile |
| `elapsed_ms` | `float` | No | Server-side lookup time in milliseconds |
| `facts` | `dict` | No | Reputation facts for the address when available |
| `id` | `str` | No |  |
| `ip` | `str` | No | Queried IPv4 address |
| `is_abuser` | `bool` | No | Address currently associated with abuse activity |
| `is_bogon` | `bool` | No | Reserved or unrouted address space |
| `is_datacenter` | `bool` | No | Datacenter or hosting infrastructure |
| `is_proxy` | `bool` | No | Proxy infrastructure |
| `is_vpn` | `bool` | No | VPN infrastructure |
| `known` | `bool` | No | Whether the address has current reputation signals |
| `location` | `dict` | No | Approximate geolocation information |
| `non_residential_forced` | `bool` | No | Whether the address is explicitly classified as non-residential |
| `non_residential_score` | `float` | No | Numeric score for non-residential infrastructure |
| `rir` | `str` | No | Regional Internet Registry |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Detail().load({"id": "detail_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DetailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IpReputationEntity

```python
ip_reputation = client.IpReputation()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.IpReputation().load({"ip": "ip"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IpReputationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = IpReputationSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

