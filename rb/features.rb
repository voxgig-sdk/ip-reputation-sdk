# IpReputation SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module IpReputationFeatures
  def self.make_feature(name)
    case name
    when "base"
      IpReputationBaseFeature.new
    when "ratelimit"
      IpReputationRatelimitFeature.new
    when "retry"
      IpReputationRetryFeature.new
    when "test"
      IpReputationTestFeature.new
    when "timeout"
      IpReputationTimeoutFeature.new
    else
      IpReputationBaseFeature.new
    end
  end
end
