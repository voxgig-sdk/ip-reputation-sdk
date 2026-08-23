# IpReputation Golang SDK



The Golang SDK for the IpReputation API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Detail(nil)` — each with the same small set of operations (`Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/ip-reputation-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/ip-reputation-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/ip-reputation-sdk/go=../ip-reputation-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/ip-reputation-sdk/go"
)

func main() {
    client := sdk.NewIpReputationSDK(map[string]any{
        "apikey": os.Getenv("IP_REPUTATION_APIKEY"),
    })

    // Load a single detail — the value is the loaded record.
    detail, err := client.Detail(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(detail)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
detail, err := client.Detail(nil).Load(map[string]any{"id": "example_id"}, nil)
if err != nil {
    // handle err
    return
}
_ = detail
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

detail, err := client.Detail(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(detail) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewIpReputationSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewIpReputationSDK

```go
func NewIpReputationSDK(options map[string]any) *IpReputationSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *IpReputationSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### IpReputationSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Detail` | `(data map[string]any) IpReputationEntity` | Create a Detail entity instance. |
| `IpReputation` | `(data map[string]any) IpReputationEntity` | Create an IpReputation entity instance. |

### Entity interface (IpReputationEntity)

All entities implement the `IpReputationEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    detail, err := client.Detail(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil { /* handle */ }
    // detail is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Detail

| Field | Description |
| --- | --- |
| `"abuse"` | Abuse contact information |
| `"abuse_score"` | Numeric abuse score from 0 to 1. |
| `"asn"` | Autonomous System Number profile |
| `"company"` | Network owner profile |
| `"elapsed_ms"` | Server-side lookup time in milliseconds |
| `"facts"` | Reputation facts for the address when available |
| `"ip"` | Queried IPv4 address |
| `"is_abuser"` | Address currently associated with abuse activity |
| `"is_bogon"` | Reserved or unrouted address space |
| `"is_datacenter"` | Datacenter or hosting infrastructure |
| `"is_proxy"` | Proxy infrastructure |
| `"is_vpn"` | VPN infrastructure |
| `"known"` | Whether the address has current reputation signals |
| `"location"` | Approximate geolocation information |
| `"non_residential_forced"` | Whether the address is explicitly classified as non-residential |
| `"non_residential_score"` | Numeric score for non-residential infrastructure |
| `"rir"` | Regional Internet Registry |

Operations: Load.

API path: `/v1/detail/{ip}`

#### IpReputation

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/v1/score/{ip}`



## Entities


### Detail

Create an instance: `detail := client.Detail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abuse` | `map[string]any` | Abuse contact information |
| `abuse_score` | `float64` | Numeric abuse score from 0 to 1. |
| `asn` | `map[string]any` | Autonomous System Number profile |
| `company` | `map[string]any` | Network owner profile |
| `elapsed_ms` | `float64` | Server-side lookup time in milliseconds |
| `facts` | `map[string]any` | Reputation facts for the address when available |
| `ip` | `string` | Queried IPv4 address |
| `is_abuser` | `bool` | Address currently associated with abuse activity |
| `is_bogon` | `bool` | Reserved or unrouted address space |
| `is_datacenter` | `bool` | Datacenter or hosting infrastructure |
| `is_proxy` | `bool` | Proxy infrastructure |
| `is_vpn` | `bool` | VPN infrastructure |
| `known` | `bool` | Whether the address has current reputation signals |
| `location` | `map[string]any` | Approximate geolocation information |
| `non_residential_forced` | `bool` | Whether the address is explicitly classified as non-residential |
| `non_residential_score` | `float64` | Numeric score for non-residential infrastructure |
| `rir` | `string` | Regional Internet Registry |

#### Example: Load

```go
detail, err := client.Detail(nil).Load(map[string]any{"id": "detail_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(detail) // the loaded record
```


### IpReputation

Create an instance: `ipReputation := client.IpReputation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
ipReputation, err := client.IpReputation(nil).Load(map[string]any{"ip": "ip"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(ipReputation) // the loaded record
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/ip-reputation-sdk/go/
├── ip-reputation.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/ip-reputation-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
detail := client.Detail(nil)
detail.Load(map[string]any{"id": "example_id"}, nil)

// detail.Data() now returns the detail data from the last load
// detail.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
