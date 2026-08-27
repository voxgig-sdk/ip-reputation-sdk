# IpReputation SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "IpReputation",
            "slug": "ip-reputation",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://api.netbait.org",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "detail": {},
                "ip_reputation": {},
            },
        },
        "entity": {
      "detail": {
        "fields": [
          {
            "name": "abuse",
            "short": "Abuse contact information",
            "type": "`$OBJECT`",
          },
          {
            "name": "abuse_score",
            "short": "Numeric abuse score from 0 to 1.",
            "type": "`$NUMBER`",
          },
          {
            "name": "asn",
            "short": "Autonomous System Number profile",
            "type": "`$OBJECT`",
          },
          {
            "name": "company",
            "short": "Network owner profile",
            "type": "`$OBJECT`",
          },
          {
            "name": "elapsed_ms",
            "short": "Server-side lookup time in milliseconds",
            "type": "`$NUMBER`",
          },
          {
            "name": "facts",
            "short": "Reputation facts for the address when available",
            "type": "`$OBJECT`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "ip",
            "short": "Queried IPv4 address",
            "type": "`$STRING`",
          },
          {
            "name": "is_abuser",
            "short": "Address currently associated with abuse activity",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "is_bogon",
            "short": "Reserved or unrouted address space",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "is_datacenter",
            "short": "Datacenter or hosting infrastructure",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "is_proxy",
            "short": "Proxy infrastructure",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "is_vpn",
            "short": "VPN infrastructure",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "known",
            "short": "Whether the address has current reputation signals",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "location",
            "short": "Approximate geolocation information",
            "type": "`$OBJECT`",
          },
          {
            "name": "non_residential_forced",
            "short": "Whether the address is explicitly classified as non-residential",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "non_residential_score",
            "short": "Numeric score for non-residential infrastructure",
            "type": "`$NUMBER`",
          },
          {
            "name": "rir",
            "short": "Regional Internet Registry",
            "type": "`$STRING`",
          },
        ],
        "name": "detail",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "1.1.1.1",
                      "kind": "param",
                      "name": "id",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/detail/{ip}",
                "parts": [
                  "v1",
                  "detail",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ip": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                "args": {
                  "params": [
                    {
                      "example": "8.8.8.8",
                      "kind": "param",
                      "name": "ip",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/score/{ip}",
                "parts": [
                  "v1",
                  "score",
                  "{ip}",
                ],
                "select": {
                  "exist": [
                    "ip",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "score",
            ],
          ],
        },
      },
    },
    }
