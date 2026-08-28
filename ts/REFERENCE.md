# IpReputation TypeScript SDK Reference

Complete API reference for the IpReputation TypeScript SDK.


## IpReputationSDK

### Constructor

```ts
new IpReputationSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IpReputationSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = IpReputationSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `IpReputationSDK` instance in test mode.


### Instance Methods

#### `Detail(data?: object)`

Create a new `Detail` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DetailEntity` instance.

#### `IpReputation(data?: object)`

Create a new `IpReputation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IpReputationEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `IpReputationSDK.test()`.

**Returns:** `IpReputationSDK` instance in test mode.


---

## DetailEntity

```ts
const detail = client.Detail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abuse` | `Record<string, any>` | No | Abuse contact information |
| `abuse_score` | `number` | No | Numeric abuse score from 0 to 1. |
| `asn` | `Record<string, any>` | No | Autonomous System Number profile |
| `company` | `Record<string, any>` | No | Network owner profile |
| `elapsed_ms` | `number` | No | Server-side lookup time in milliseconds |
| `facts` | `Record<string, any>` | No | Reputation facts for the address when available |
| `id` | `string` | No |  |
| `ip` | `string` | No | Queried IPv4 address |
| `is_abuser` | `boolean` | No | Address currently associated with abuse activity |
| `is_bogon` | `boolean` | No | Reserved or unrouted address space |
| `is_datacenter` | `boolean` | No | Datacenter or hosting infrastructure |
| `is_proxy` | `boolean` | No | Proxy infrastructure |
| `is_vpn` | `boolean` | No | VPN infrastructure |
| `known` | `boolean` | No | Whether the address has current reputation signals |
| `location` | `Record<string, any>` | No | Approximate geolocation information |
| `non_residential_forced` | `boolean` | No | Whether the address is explicitly classified as non-residential |
| `non_residential_score` | `number` | No | Numeric score for non-residential infrastructure |
| `rir` | `string` | No | Regional Internet Registry |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Detail().load({ id: 'detail_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DetailEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpReputationSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IpReputationEntity

```ts
const ip_reputation = client.IpReputation()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.IpReputation().load({ ip: 'ip' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IpReputationEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpReputationSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new IpReputationSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

