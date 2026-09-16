"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('DetailEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when IP_REPUTATION_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('IP_REPUTATION_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.IpReputationSDK.test();
        const ent = testsdk.Detail();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.IP_REPUTATION_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'detail.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "abuse", "req": false, "short": "Abuse contact information", "type": "`$OBJECT`", "index$": 0 }, { "active": true, "format": "float", "name": "abuse_score", "req": false, "short": "Numeric abuse score from 0 to 1.", "type": "`$NUMBER`", "index$": 1 }, { "active": true, "name": "asn", "req": false, "short": "Autonomous System Number profile", "type": "`$OBJECT`", "index$": 2 }, { "active": true, "name": "company", "req": false, "short": "Network owner profile", "type": "`$OBJECT`", "index$": 3 }, { "active": true, "format": "float", "name": "elapsed_ms", "req": false, "short": "Server-side lookup time in milliseconds", "type": "`$NUMBER`", "index$": 4 }, { "active": true, "name": "facts", "req": false, "short": "Reputation facts for the address when available", "type": "`$OBJECT`", "index$": 5 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "ip", "req": false, "short": "Queried IPv4 address", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "is_abuser", "req": false, "short": "Address currently associated with abuse activity", "type": "`$BOOLEAN`", "index$": 8 }, { "active": true, "name": "is_bogon", "req": false, "short": "Reserved or unrouted address space", "type": "`$BOOLEAN`", "index$": 9 }, { "active": true, "name": "is_datacenter", "req": false, "short": "Datacenter or hosting infrastructure", "type": "`$BOOLEAN`", "index$": 10 }, { "active": true, "name": "is_proxy", "req": false, "short": "Proxy infrastructure", "type": "`$BOOLEAN`", "index$": 11 }, { "active": true, "name": "is_vpn", "req": false, "short": "VPN infrastructure", "type": "`$BOOLEAN`", "index$": 12 }, { "active": true, "name": "known", "req": false, "short": "Whether the address has current reputation signals", "type": "`$BOOLEAN`", "index$": 13 }, { "active": true, "name": "location", "req": false, "short": "Approximate geolocation information", "type": "`$OBJECT`", "index$": 14 }, { "active": true, "name": "non_residential_forced", "req": false, "short": "Whether the address is explicitly classified as non-residential", "type": "`$BOOLEAN`", "index$": 15 }, { "active": true, "format": "float", "name": "non_residential_score", "req": false, "short": "Numeric score for non-residential infrastructure", "type": "`$NUMBER`", "index$": 16 }, { "active": true, "name": "rir", "req": false, "short": "Regional Internet Registry", "type": "`$STRING`", "index$": 17 }], "id": { "field": "id", "name": "id" }, "name": "detail", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "1.1.1.1", "kind": "param", "name": "id", "orig": "ip", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /v1/detail/{ip}", "json": "{\"operationId\":\"getIpDetail\",\"parameters\":[{\"description\":\"IPv4 address to lookup\",\"in\":\"path\",\"name\":\"ip\",\"required\":true,\"schema\":{\"example\":\"1.1.1.1\",\"pattern\":\"^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Detailed profile for an IPv4 address including threat intelligence, network information, and location data\",\"properties\":{\"abuse\":{\"description\":\"Abuse contact information\",\"properties\":{\"address\":{\"description\":\"Physical address\",\"example\":\"PO Box 3646, South Brisbane, QLD 4101, Australia\",\"type\":\"string\"},\"email\":{\"description\":\"Abuse contact email\",\"example\":\"helpdesk@apnic.net\",\"type\":\"string\"},\"name\":{\"description\":\"Abuse contact name or identifier\",\"example\":\"IRT-APNICRANDNET-AU\",\"type\":\"string\"},\"phone\":{\"description\":\"Abuse contact phone number\",\"example\":\"\",\"type\":\"string\"}},\"type\":\"object\"},\"abuse_score\":{\"description\":\"Numeric abuse score from 0 to 1. 0.00-0.30: Low threat, 0.30-0.65: Moderate threat, 0.65-1.00: High threat\",\"example\":0,\"format\":\"float\",\"maximum\":1,\"minimum\":0,\"type\":\"number\"},\"asn\":{\"description\":\"Autonomous System Number profile\",\"properties\":{\"abuse\":{\"description\":\"Abuse contact email\",\"example\":\"abuse@cloudflare.com\",\"type\":\"string\"},\"abuser_score\":{\"description\":\"ASN abuse score with severity rating\",\"example\":\"0.0000 (Low)\",\"type\":\"string\"},\"active\":{\"description\":\"Whether the ASN is currently active\",\"example\":true,\"type\":\"boolean\"},\"asn\":{\"description\":\"Autonomous System Number\",\"example\":13335,\"type\":\"integer\"},\"country\":{\"description\":\"Country code\",\"example\":\"au\",\"type\":\"string\"},\"created\":{\"description\":\"ASN creation date\",\"example\":\"2011-08-10\",\"format\":\"date\",\"type\":\"string\"},\"descr\":{\"description\":\"ASN description\",\"example\":\"CLOUDFLARENET, AU\",\"type\":\"string\"},\"domain\":{\"description\":\"Organization domain\",\"example\":\"cloudflare.com\",\"type\":\"string\"},\"org\":{\"description\":\"Organization name\",\"example\":\"CLOUDFLARENET\",\"type\":\"string\"},\"rir\":{\"description\":\"Regional Internet Registry\",\"example\":\"APNIC\",\"type\":\"string\"},\"route\":{\"description\":\"BGP route prefix\",\"example\":\"1.1.1.0/24\",\"type\":\"string\"},\"type\":{\"description\":\"Network type\",\"example\":\"hosting\",\"type\":\"string\"},\"updated\":{\"description\":\"ASN last update date\",\"example\":\"2023-04-26\",\"format\":\"date\",\"type\":\"string\"}},\"type\":\"object\"},\"company\":{\"description\":\"Network owner profile\",\"properties\":{\"abuser_score\":{\"description\":\"Company abuse score with severity rating\",\"example\":\"0.0000 (Low)\",\"type\":\"string\"},\"domain\":{\"description\":\"Company domain\",\"example\":\"cloudflare.com\",\"type\":\"string\"},\"name\":{\"description\":\"Company or network name\",\"example\":\"CLOUDFLARENET\",\"type\":\"string\"},\"netname\":{\"description\":\"Network name\",\"example\":\"APNIC-LABS\",\"type\":\"string\"},\"network\":{\"description\":\"IP address range\",\"example\":\"1.1.1.0 - 1.1.1.255\",\"type\":\"string\"},\"type\":{\"description\":\"Network type (e.g., hosting, isp, business)\",\"example\":\"hosting\",\"type\":\"string\"}},\"type\":\"object\"},\"elapsed_ms\":{\"description\":\"Server-side lookup time in milliseconds\",\"example\":624.16,\"format\":\"float\",\"type\":\"number\"},\"facts\":{\"description\":\"Reputation facts for the address when available\",\"properties\":{\"known\":{\"description\":\"Whether the address has known reputation signals\",\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"},\"ip\":{\"description\":\"Queried IPv4 address\",\"example\":\"1.1.1.1\",\"type\":\"string\"},\"is_abuser\":{\"description\":\"Address currently associated with abuse activity\",\"example\":false,\"type\":\"boolean\"},\"is_bogon\":{\"description\":\"Reserved or unrouted address space\",\"example\":false,\"type\":\"boolean\"},\"is_datacenter\":{\"description\":\"Datacenter or hosting infrastructure\",\"example\":true,\"type\":\"boolean\"},\"is_proxy\":{\"description\":\"Proxy infrastructure\",\"example\":false,\"type\":\"boolean\"},\"is_vpn\":{\"description\":\"VPN infrastructure\",\"example\":false,\"type\":\"boolean\"},\"known\":{\"description\":\"Whether the address has current reputation signals\",\"example\":false,\"type\":\"boolean\"},\"location\":{\"description\":\"Approximate geolocation information\",\"properties\":{\"accuracy\":{\"description\":\"Location accuracy level (LOW, MEDIUM, HIGH)\",\"example\":\"MEDIUM\",\"type\":\"string\"},\"calling_code\":{\"description\":\"Country calling code\",\"example\":\"61\",\"type\":\"string\"},\"city\":{\"description\":\"City name\",\"example\":\"Sydney\",\"type\":\"string\"},\"continent\":{\"description\":\"Continent code\",\"example\":\"OC\",\"type\":\"string\"},\"country\":{\"description\":\"Country name\",\"example\":\"Australia\",\"type\":\"string\"},\"country_code\":{\"description\":\"ISO country code\",\"example\":\"AU\",\"type\":\"string\"},\"currency_code\":{\"description\":\"Country currency code\",\"example\":\"AUD\",\"type\":\"string\"},\"is_dst\":{\"description\":\"Whether daylight saving time is active\",\"example\":false,\"type\":\"boolean\"},\"is_eu_member\":{\"description\":\"Whether the country is an EU member\",\"example\":false,\"type\":\"boolean\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"example\":-33.8688,\"format\":\"float\",\"type\":\"number\"},\"local_time\":{\"description\":\"Local time at the location\",\"example\":\"2026-07-14T00:32:49+10:00\",\"format\":\"date-time\",\"type\":\"string\"},\"local_time_unix\":{\"description\":\"Local time as Unix timestamp\",\"example\":1783953169,\"type\":\"integer\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"example\":151.2093,\"format\":\"float\",\"type\":\"number\"},\"state\":{\"description\":\"State or region\",\"example\":\"\",\"type\":\"string\"},\"timezone\":{\"description\":\"Timezone identifier\",\"example\":\"Australia/Sydney\",\"type\":\"string\"},\"utcoffset\":{\"description\":\"UTC offset\",\"example\":\"+10:00\",\"type\":\"string\"},\"zip\":{\"description\":\"Postal code\",\"example\":\"\",\"type\":\"string\"}},\"type\":\"object\"},\"non_residential_forced\":{\"description\":\"Whether the address is explicitly classified as non-residential\",\"example\":false,\"type\":\"boolean\"},\"non_residential_score\":{\"description\":\"Numeric score for non-residential infrastructure\",\"example\":0,\"format\":\"float\",\"maximum\":1,\"minimum\":0,\"type\":\"number\"},\"rir\":{\"description\":\"Regional Internet Registry\",\"example\":\"APNIC\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with detailed IP profile\",\"headers\":{\"RateLimit-Limit\":{\"description\":\"Maximum requests per second for this token\",\"schema\":{\"type\":\"integer\"}},\"RateLimit-Remaining\":{\"description\":\"Requests remaining in the current window\",\"schema\":{\"type\":\"integer\"}},\"RateLimit-Reset\":{\"description\":\"Unix timestamp when the counter resets\",\"schema\":{\"type\":\"integer\"}}}},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"The address provided is not a valid IPv4 address\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"example\":400,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"The address provided is not a valid IPv4 address\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"The address provided is not a valid IPv4 address\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"example\":400,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid token\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"The address provided is not a valid IPv4 address\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"example\":400,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\",\"headers\":{\"Retry-After\":{\"description\":\"Number of seconds to wait before retrying\",\"schema\":{\"type\":\"integer\"}}}},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"The address provided is not a valid IPv4 address\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"example\":400,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal error on server side\"}},\"security\":[{},{\"BearerAuth\":[]}],\"securitySchemes\":{\"BearerAuth\":{\"bearerFormat\":\"nb_live_...\",\"description\":\"Bearer token for authenticated requests with higher rate limits. Format: `Authorization: Bearer nb_live_...`. Tokens are issued on request by emailing hello@netbait.org with your use case and required rate limit.\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/v1/detail/{ip}", "rename": { "param": { "ip": "id" } }, "segments": [{ "lit": "v1" }, { "lit": "detail" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "detail", "name__orig": "detail", "Name": "Detail", "name_": "detail", "name-": "detail", "NAME": "DETAIL", "index$": 0 }, { "active": true, "entity": "detail", "key$": "BasicDetailFlow", "kind": "basic", "name": "BasicDetailFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "detail_ref01", "srcdatavar": "detail_ref01_data", "suffix": "_dt0" }, "match": { "id": "detail01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-detail_ref01" } }], "index$": 0 }] }, 'Detail');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let detail_ref01_data = Object.values(setup.data.existing.detail)[0];
        // LOAD
        const detail_ref01_ent = client.Detail();
        const detail_ref01_match_dt0 = {};
        detail_ref01_match_dt0.id = detail_ref01_data.id;
        const detail_ref01_data_dt0 = (await detail_ref01_ent.load(detail_ref01_match_dt0)).data();
        (0, node_assert_1.default)(detail_ref01_data_dt0.id === detail_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/detail/DetailTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.IpReputationSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['detail01', 'detail02', 'detail03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'IP_REPUTATION_TEST_DETAIL_ENTID': idmap,
        'IP_REPUTATION_TEST_LIVE': 'FALSE',
        'IP_REPUTATION_TEST_EXPLAIN': 'FALSE',
        'IP_REPUTATION_APIKEY': '',
    });
    idmap = env['IP_REPUTATION_TEST_DETAIL_ENTID'];
    const live = 'TRUE' === env.IP_REPUTATION_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['IP_REPUTATION_TEST_DETAIL_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.IpReputationSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.IP_REPUTATION_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.IP_REPUTATION_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=DetailEntity.test.js.map