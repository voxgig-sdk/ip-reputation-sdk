# IpReputation PHP SDK Reference

Complete API reference for the IpReputation PHP SDK.


## IpReputationSDK

### Constructor

```php
require_once __DIR__ . '/ipreputation_sdk.php';

$client = new IpReputationSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IpReputationSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = IpReputationSDK::test();
```


### Instance Methods

#### `Detail($data = null)`

Create a new `DetailEntity` instance. Pass `null` for no initial data.

#### `IpReputation($data = null)`

Create a new `IpReputationEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): IpReputationUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## DetailEntity

```php
$detail = $client->Detail();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abuse` | `array` | No |  |
| `abuse_score` | `float` | No |  |
| `asn` | `array` | No |  |
| `company` | `array` | No |  |
| `elapsed_m` | `float` | No |  |
| `fact` | `array` | No |  |
| `ip` | `string` | No |  |
| `is_abuser` | `bool` | No |  |
| `is_bogon` | `bool` | No |  |
| `is_datacenter` | `bool` | No |  |
| `is_proxy` | `bool` | No |  |
| `is_vpn` | `bool` | No |  |
| `known` | `bool` | No |  |
| `location` | `array` | No |  |
| `non_residential_forced` | `bool` | No |  |
| `non_residential_score` | `float` | No |  |
| `rir` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Detail()->load(["id" => "detail_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DetailEntity`

Create a new `DetailEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## IpReputationEntity

```php
$ip_reputation = $client->IpReputation();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->IpReputation()->load(["ip" => "ip"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IpReputationEntity`

Create a new `IpReputationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new IpReputationSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

