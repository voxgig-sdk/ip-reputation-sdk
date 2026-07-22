# IpReputation entity test

require "minitest/autorun"
require "json"
require_relative "../IpReputation_sdk"
require_relative "runner"

class IpReputationEntityTest < Minitest::Test
  def test_create_instance
    testsdk = IpReputationSDK.test(nil, nil)
    ent = testsdk.IpReputation(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = ip_reputation_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "ip_reputation." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set IPREPUTATION_TEST_IP_REPUTATION_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    ip_reputation_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.ip_reputation")))
    ip_reputation_ref01_data = nil
    if ip_reputation_ref01_data_raw.length > 0
      ip_reputation_ref01_data = Helpers.to_map(ip_reputation_ref01_data_raw[0][1])
    end

    # LOAD
    ip_reputation_ref01_ent = client.IpReputation(nil)
    ip_reputation_ref01_match_dt0 = {}
    ip_reputation_ref01_data_dt0_loaded = ip_reputation_ref01_ent.load(ip_reputation_ref01_match_dt0, nil)
    assert !ip_reputation_ref01_data_dt0_loaded.nil?

  end
end

def ip_reputation_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "ip_reputation", "IpReputationTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = IpReputationSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["ip_reputation01", "ip_reputation02", "ip_reputation03", "score01", "score02", "score03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["IPREPUTATION_TEST_IP_REPUTATION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "IPREPUTATION_TEST_IP_REPUTATION_ENTID" => idmap,
    "IPREPUTATION_TEST_LIVE" => "FALSE",
    "IPREPUTATION_TEST_EXPLAIN" => "FALSE",
    "IPREPUTATION_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["IPREPUTATION_TEST_IP_REPUTATION_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["IPREPUTATION_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["IPREPUTATION_APIKEY"],
      },
      extra || {},
    ])
    client = IpReputationSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["IPREPUTATION_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["IPREPUTATION_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
