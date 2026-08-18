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
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'abuse_score',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'asn',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'company',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'elapsed_ms',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'facts',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'ip',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'is_abuser',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'is_bogon',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'is_datacenter',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'is_proxy',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'is_vpn',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'known',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'location',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'non_residential_forced',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'non_residential_score',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'rir',
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
