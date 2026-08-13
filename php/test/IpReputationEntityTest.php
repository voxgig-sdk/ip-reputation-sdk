<?php
declare(strict_types=1);

// IpReputation entity test

require_once __DIR__ . '/../ipreputation_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class IpReputationEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = IpReputationSDK::test(null, null);
        $ent = $testsdk->IpReputation(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = ip_reputation_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "ip_reputation." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set IP_REPUTATION_TEST_IP_REPUTATION_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $ip_reputation_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.ip_reputation")));
        $ip_reputation_ref01_data = null;
        if (count($ip_reputation_ref01_data_raw) > 0) {
            $ip_reputation_ref01_data = Helpers::to_map($ip_reputation_ref01_data_raw[0][1]);
        }

        // LOAD
        $ip_reputation_ref01_ent = $client->IpReputation(null);
        $ip_reputation_ref01_match_dt0 = [];
        $ip_reputation_ref01_data_dt0_loaded = $ip_reputation_ref01_ent->load($ip_reputation_ref01_match_dt0, null);
        $this->assertNotNull($ip_reputation_ref01_data_dt0_loaded);

    }
}

function ip_reputation_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/ip_reputation/IpReputationTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = IpReputationSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["ip_reputation01", "ip_reputation02", "ip_reputation03", "score01", "score02", "score03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("IP_REPUTATION_TEST_IP_REPUTATION_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "IP_REPUTATION_TEST_IP_REPUTATION_ENTID" => $idmap,
        "IP_REPUTATION_TEST_LIVE" => "FALSE",
        "IP_REPUTATION_TEST_EXPLAIN" => "FALSE",
        "IP_REPUTATION_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["IP_REPUTATION_TEST_IP_REPUTATION_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["IP_REPUTATION_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["IP_REPUTATION_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new IpReputationSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["IP_REPUTATION_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["IP_REPUTATION_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
