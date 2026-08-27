<?php
declare(strict_types=1);

// IpReputation SDK configuration

class IpReputationConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "IpReputation",
                "slug" => "ip-reputation",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://api.netbait.org",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "detail" => [],
                    "ip_reputation" => [],
                ],
            ],
            "entity" => [
        'detail' => [
          'fields' => [
            [
              'name' => 'abuse',
              'short' => 'Abuse contact information',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'abuse_score',
              'short' => 'Numeric abuse score from 0 to 1.',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'asn',
              'short' => 'Autonomous System Number profile',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'company',
              'short' => 'Network owner profile',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'elapsed_ms',
              'short' => 'Server-side lookup time in milliseconds',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'facts',
              'short' => 'Reputation facts for the address when available',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'ip',
              'short' => 'Queried IPv4 address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'is_abuser',
              'short' => 'Address currently associated with abuse activity',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'is_bogon',
              'short' => 'Reserved or unrouted address space',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'is_datacenter',
              'short' => 'Datacenter or hosting infrastructure',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'is_proxy',
              'short' => 'Proxy infrastructure',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'is_vpn',
              'short' => 'VPN infrastructure',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'known',
              'short' => 'Whether the address has current reputation signals',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'location',
              'short' => 'Approximate geolocation information',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'non_residential_forced',
              'short' => 'Whether the address is explicitly classified as non-residential',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'non_residential_score',
              'short' => 'Numeric score for non-residential infrastructure',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'rir',
              'short' => 'Regional Internet Registry',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'detail',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => '1.1.1.1',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'ip',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/detail/{ip}',
                  'parts' => [
                    'v1',
                    'detail',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'ip' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'ip_reputation' => [
          'fields' => [],
          'name' => 'ip_reputation',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => '8.8.8.8',
                        'kind' => 'param',
                        'name' => 'ip',
                        'orig' => 'ip',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/score/{ip}',
                  'parts' => [
                    'v1',
                    'score',
                    '{ip}',
                  ],
                  'select' => [
                    'exist' => [
                      'ip',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'score',
              ],
            ],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return IpReputationFeatures::make_feature($name);
    }
}
