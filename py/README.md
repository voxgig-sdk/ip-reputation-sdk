# IpReputation Python SDK



The Python SDK for the IpReputation API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Detail()` — each
carrying a small, uniform set of operations (`load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/ip-reputation-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from ipreputation_sdk import IpReputationSDK

client = IpReputationSDK({
    "apikey": os.environ.get("IP_REPUTATION_APIKEY"),
})
```

### 3. Load an ipreputation

IpReputation is nested under ip, so provide the `ip`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    ipreputation = client.IpReputation().load({"ip": "example_ip"})
    print(ipreputation)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    detail = client.Detail().load({"id": "example_id"})
    print(detail)
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = IpReputationSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
detail = client.Detail().load({"id": "test01"})
# detail contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = IpReputationSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
IP_REPUTATION_TEST_LIVE=TRUE
IP_REPUTATION_APIKEY=<your-key>
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### IpReputationSDK

```python
from ipreputation_sdk import IpReputationSDK

client = IpReputationSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = IpReputationSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### IpReputationSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Detail` | `(data) -> DetailEntity` | Create a Detail entity instance. |
| `IpReputation` | `(data) -> IpReputationEntity` | Create an IpReputation entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### Detail

| Field | Description |
| --- | --- |
| `abuse` | Abuse contact information |
| `abuse_score` | Numeric abuse score from 0 to 1. |
| `asn` | Autonomous System Number profile |
| `company` | Network owner profile |
| `elapsed_ms` | Server-side lookup time in milliseconds |
| `facts` | Reputation facts for the address when available |
| `id` |  |
| `ip` | Queried IPv4 address |
| `is_abuser` | Address currently associated with abuse activity |
| `is_bogon` | Reserved or unrouted address space |
| `is_datacenter` | Datacenter or hosting infrastructure |
| `is_proxy` | Proxy infrastructure |
| `is_vpn` | VPN infrastructure |
| `known` | Whether the address has current reputation signals |
| `location` | Approximate geolocation information |
| `non_residential_forced` | Whether the address is explicitly classified as non-residential |
| `non_residential_score` | Numeric score for non-residential infrastructure |
| `rir` | Regional Internet Registry |

Operations: Load.

API path: `/v1/detail/{ip}`

#### IpReputation

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/v1/score/{ip}`



## Entities


### Detail

Create an instance: `detail = client.Detail()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abuse` | `dict` | Abuse contact information |
| `abuse_score` | `float` | Numeric abuse score from 0 to 1. |
| `asn` | `dict` | Autonomous System Number profile |
| `company` | `dict` | Network owner profile |
| `elapsed_ms` | `float` | Server-side lookup time in milliseconds |
| `facts` | `dict` | Reputation facts for the address when available |
| `id` | `str` |  |
| `ip` | `str` | Queried IPv4 address |
| `is_abuser` | `bool` | Address currently associated with abuse activity |
| `is_bogon` | `bool` | Reserved or unrouted address space |
| `is_datacenter` | `bool` | Datacenter or hosting infrastructure |
| `is_proxy` | `bool` | Proxy infrastructure |
| `is_vpn` | `bool` | VPN infrastructure |
| `known` | `bool` | Whether the address has current reputation signals |
| `location` | `dict` | Approximate geolocation information |
| `non_residential_forced` | `bool` | Whether the address is explicitly classified as non-residential |
| `non_residential_score` | `float` | Numeric score for non-residential infrastructure |
| `rir` | `str` | Regional Internet Registry |

#### Example: Load

```python
detail = client.Detail().load({"id": "detail_id"})
```


### IpReputation

Create an instance: `ip_reputation = client.IpReputation()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
ip_reputation = client.IpReputation().load({"ip": "ip"})
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── ipreputation_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`ipreputation_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
detail = client.Detail()
detail.load({"id": "example_id"})

# detail.data_get() now returns the detail data from the last load
# detail.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
