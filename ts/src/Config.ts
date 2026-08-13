
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'IpReputation',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: 'https://api.netbait.org',

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      detail: {
      },

      ip_reputation: {
      },

    }
  }


  entity = {
    "detail": {
      "fields": [
        {
          "active": true,
          "name": "abuse",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 0
        },
        {
          "active": true,
          "name": "abuse_score",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 1
        },
        {
          "active": true,
          "name": "asn",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 2
        },
        {
          "active": true,
          "name": "company",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 3
        },
        {
          "active": true,
          "name": "elapsed_ms",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 4
        },
        {
          "active": true,
          "name": "facts",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 5
        },
        {
          "active": true,
          "name": "ip",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        },
        {
          "active": true,
          "name": "is_abuser",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 7
        },
        {
          "active": true,
          "name": "is_bogon",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 8
        },
        {
          "active": true,
          "name": "is_datacenter",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 9
        },
        {
          "active": true,
          "name": "is_proxy",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 10
        },
        {
          "active": true,
          "name": "is_vpn",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 11
        },
        {
          "active": true,
          "name": "known",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 12
        },
        {
          "active": true,
          "name": "location",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 13
        },
        {
          "active": true,
          "name": "non_residential_forced",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 14
        },
        {
          "active": true,
          "name": "non_residential_score",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 15
        },
        {
          "active": true,
          "name": "rir",
          "req": false,
          "type": "`$STRING`",
          "index$": 16
        }
      ],
      "name": "detail",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "1.1.1.1",
                    "kind": "param",
                    "name": "id",
                    "orig": "ip",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/detail/{ip}",
              "parts": [
                "v1",
                "detail",
                "{id}"
              ],
              "rename": {
                "param": {
                  "ip": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "ip_reputation": {
      "fields": [],
      "name": "ip_reputation",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "8.8.8.8",
                    "kind": "param",
                    "name": "ip",
                    "orig": "ip",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/score/{ip}",
              "parts": [
                "v1",
                "score",
                "{ip}"
              ],
              "select": {
                "exist": [
                  "ip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "score"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config
}

