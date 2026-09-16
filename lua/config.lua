-- IpReputation SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "IpReputation",
      slug = "ip-reputation",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://api.netbait.org",
      auth = {
        prefix = "Bearer",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["detail"] = {},
        ["ip_reputation"] = {},
      },
    },
    entity = {
      ["detail"] = {
        ["fields"] = {
          {
            ["name"] = "abuse",
            ["short"] = "Abuse contact information",
            ["type"] = "`$OBJECT`",
          },
          {
            ["format"] = "float",
            ["name"] = "abuse_score",
            ["short"] = "Numeric abuse score from 0 to 1.",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "asn",
            ["short"] = "Autonomous System Number profile",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "company",
            ["short"] = "Network owner profile",
            ["type"] = "`$OBJECT`",
          },
          {
            ["format"] = "float",
            ["name"] = "elapsed_ms",
            ["short"] = "Server-side lookup time in milliseconds",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "facts",
            ["short"] = "Reputation facts for the address when available",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "ip",
            ["short"] = "Queried IPv4 address",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "is_abuser",
            ["short"] = "Address currently associated with abuse activity",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "is_bogon",
            ["short"] = "Reserved or unrouted address space",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "is_datacenter",
            ["short"] = "Datacenter or hosting infrastructure",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "is_proxy",
            ["short"] = "Proxy infrastructure",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "is_vpn",
            ["short"] = "VPN infrastructure",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "known",
            ["short"] = "Whether the address has current reputation signals",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "location",
            ["short"] = "Approximate geolocation information",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "non_residential_forced",
            ["short"] = "Whether the address is explicitly classified as non-residential",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["format"] = "float",
            ["name"] = "non_residential_score",
            ["short"] = "Numeric score for non-residential infrastructure",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "rir",
            ["short"] = "Regional Internet Registry",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "detail",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "1.1.1.1",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "ip",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/detail/{ip}",
                ["rename"] = {
                  ["param"] = {
                    ["ip"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "detail",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "v1",
                  "detail",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["ip_reputation"] = {
        ["fields"] = {},
        ["name"] = "ip_reputation",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "8.8.8.8",
                      ["kind"] = "param",
                      ["name"] = "ip",
                      ["orig"] = "ip",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/score/{ip}",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "score",
                  },
                  {
                    ["var"] = "ip",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "ip",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "v1",
                  "score",
                  "{ip}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "score",
            },
          },
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
