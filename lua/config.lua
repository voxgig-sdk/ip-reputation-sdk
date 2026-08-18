-- IpReputation SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "IpReputation",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "abuse_score",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "asn",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "company",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "elapsed_ms",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "facts",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "ip",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "is_abuser",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "is_bogon",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "is_datacenter",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "is_proxy",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "is_vpn",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "known",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "location",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "non_residential_forced",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "non_residential_score",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "rir",
            ["type"] = "`$STRING`",
          },
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
                ["parts"] = {
                  "v1",
                  "detail",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["ip"] = "id",
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
                ["parts"] = {
                  "v1",
                  "score",
                  "{ip}",
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
