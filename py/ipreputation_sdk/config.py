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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "type": "`$OBJECT`",
          },
          {
            "name": "abuse_score",
            "type": "`$NUMBER`",
          },
          {
            "name": "asn",
            "type": "`$OBJECT`",
          },
          {
            "name": "company",
            "type": "`$OBJECT`",
          },
          {
            "name": "elapsed_ms",
            "type": "`$NUMBER`",
          },
          {
            "name": "facts",
            "type": "`$OBJECT`",
          },
          {
            "name": "ip",
            "type": "`$STRING`",
          },
          {
            "name": "is_abuser",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "is_bogon",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "is_datacenter",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "is_proxy",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "is_vpn",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "known",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "location",
            "type": "`$OBJECT`",
          },
          {
            "name": "non_residential_forced",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "non_residential_score",
            "type": "`$NUMBER`",
          },
          {
            "name": "rir",
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
