

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { IpReputationSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('IpReputationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IP_REPUTATION_TEST_LIVE=TRUE.
  afterEach(liveDelay('IP_REPUTATION_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpReputationSDK.test()
    const ent = testsdk.IpReputation()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IP_REPUTATION_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ip_reputation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"ip_reputation","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"8.8.8.8","kind":"param","name":"ip","orig":"ip","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /v1/score/{ip}","json":"{\"operationId\":\"getIpScore\",\"parameters\":[{\"description\":\"IPv4 address to score\",\"in\":\"path\",\"name\":\"ip\",\"required\":true,\"schema\":{\"example\":\"8.8.8.8\",\"pattern\":\"^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"text/plain\":{\"example\":\"0.0412\",\"schema\":{\"example\":0.0412,\"format\":\"float\",\"maximum\":1,\"minimum\":0,\"type\":\"number\"}}},\"description\":\"Successful response with abuse score\",\"headers\":{\"RateLimit-Limit\":{\"description\":\"Maximum requests per second for this token\",\"schema\":{\"type\":\"integer\"}},\"RateLimit-Remaining\":{\"description\":\"Requests remaining in the current window\",\"schema\":{\"type\":\"integer\"}},\"RateLimit-Reset\":{\"description\":\"Unix timestamp when the counter resets\",\"schema\":{\"type\":\"integer\"}}}},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"The address provided is not a valid IPv4 address\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"example\":400,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"The address provided is not a valid IPv4 address\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"The address provided is not a valid IPv4 address\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"example\":400,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid token\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"The address provided is not a valid IPv4 address\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"example\":400,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\",\"headers\":{\"Retry-After\":{\"description\":\"Number of seconds to wait before retrying\",\"schema\":{\"type\":\"integer\"}}}},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"The address provided is not a valid IPv4 address\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"example\":400,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal error on server side\"}},\"security\":[{},{\"BearerAuth\":[]}],\"securitySchemes\":{\"BearerAuth\":{\"bearerFormat\":\"nb_live_...\",\"description\":\"Bearer token for authenticated requests with higher rate limits. Format: `Authorization: Bearer nb_live_...`. Tokens are issued on request by emailing hello@netbait.org with your use case and required rate limit.\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/score/{ip}","segments":[{"lit":"v1"},{"lit":"score"},{"var":"ip"}],"select":{"exist":["ip"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["score"]]},"key$":"ip_reputation","name__orig":"ip_reputation","Name":"IpReputation","name_":"ip_reputation","name-":"ip-reputation","NAME":"IP_REPUTATION","index$":1}, {"active":true,"entity":"ip_reputation","key$":"BasicIpReputationFlow","kind":"basic","name":"BasicIpReputationFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"ip_reputation_ref01","srcdatavar":"ip_reputation_ref01_data","suffix":"_dt0"},"match":{"id":"ip_reputation01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-ip_reputation_ref01"}}],"index$":0}]}, 'IpReputation')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let ip_reputation_ref01_data = Object.values(setup.data.existing.ip_reputation)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const ip_reputation_ref01_ent = client.IpReputation()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/ip_reputation/IpReputationTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = IpReputationSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['ip_reputation01','ip_reputation02','ip_reputation03','score01','score02','score03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IP_REPUTATION_TEST_IP_REPUTATION_ENTID': idmap,
    'IP_REPUTATION_TEST_LIVE': 'FALSE',
    'IP_REPUTATION_TEST_EXPLAIN': 'FALSE',
    'IP_REPUTATION_APIKEY': '',
  })

  idmap = env['IP_REPUTATION_TEST_IP_REPUTATION_ENTID']

  const live = 'TRUE' === env.IP_REPUTATION_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IP_REPUTATION_TEST_IP_REPUTATION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new IpReputationSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
