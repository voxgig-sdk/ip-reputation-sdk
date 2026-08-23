# IpReputation TypeScript SDK



The TypeScript SDK for the IpReputation API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Detail()` — each with a small set of operations (`load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/ip-reputation-sdk/releases](https://github.com/voxgig-sdk/ip-reputation-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { IpReputationSDK } from '@voxgig-sdk/ip-reputation'

const client = new IpReputationSDK({
  apikey: process.env.IP_REPUTATION_APIKEY,
})
```

### 3. Load an ipreputation

IpReputation is nested under ip, so provide the `ip`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const ipreputation = await client.IpReputation().load({
    ip: 'example_ip',
  })
  console.log(ipreputation)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const detail = await client.Detail().load({ id: "example_id" })
  console.log(detail)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = IpReputationSDK.test()

const detail = await client.Detail().load({ id: 'test01' })
// detail is the entity, populated with mock response data
// — call detail.data() for the record itself
console.log(detail)
```

You can also use the instance method:

```ts
const client = new IpReputationSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Detail()

// First call runs the operation and stores its result
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new IpReputationSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```


## Reference

### IpReputationSDK

#### Constructor

```ts
new IpReputationSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Detail(data?)` | `DetailEntity` | Create a Detail entity instance. |
| `IpReputation(data?)` | `IpReputationEntity` | Create an IpReputation entity instance. |
| `tester(testopts?, sdkopts?)` | `IpReputationSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `IpReputationSDK.test(testopts?, sdkopts?)` | `IpReputationSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): IpReputationSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: load.

API path: `/v1/detail/{ip}`

#### IpReputation

| Field | Description |
| --- | --- |

Operations: load.

API path: `/v1/score/{ip}`



## Entities


### Detail

Create an instance: `const detail = client.Detail()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abuse` | `Record<string, any>` | Abuse contact information |
| `abuse_score` | `number` | Numeric abuse score from 0 to 1. |
| `asn` | `Record<string, any>` | Autonomous System Number profile |
| `company` | `Record<string, any>` | Network owner profile |
| `elapsed_ms` | `number` | Server-side lookup time in milliseconds |
| `facts` | `Record<string, any>` | Reputation facts for the address when available |
| `ip` | `string` | Queried IPv4 address |
| `is_abuser` | `boolean` | Address currently associated with abuse activity |
| `is_bogon` | `boolean` | Reserved or unrouted address space |
| `is_datacenter` | `boolean` | Datacenter or hosting infrastructure |
| `is_proxy` | `boolean` | Proxy infrastructure |
| `is_vpn` | `boolean` | VPN infrastructure |
| `known` | `boolean` | Whether the address has current reputation signals |
| `location` | `Record<string, any>` | Approximate geolocation information |
| `non_residential_forced` | `boolean` | Whether the address is explicitly classified as non-residential |
| `non_residential_score` | `number` | Numeric score for non-residential infrastructure |
| `rir` | `string` | Regional Internet Registry |

#### Example: Load

```ts
const detail = await client.Detail().load({ id: 'detail_id' })
```


### IpReputation

Create an instance: `const ip_reputation = client.IpReputation()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const ip_reputation = await client.IpReputation().load({ ip: 'ip' })
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
ip-reputation/
├── src/
│   ├── IpReputationSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { IpReputationSDK } from '@voxgig-sdk/ip-reputation'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const detail = client.Detail()
await detail.load({ id: "example_id" })

// detail.data() now returns the detail data from the last `load`
// detail.match() returns { id: "example_id" }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
