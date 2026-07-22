# IpReputation SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module IpReputationFeatures
  def self.make_feature(name)
    case name
    when "base"
      IpReputationBaseFeature.new
    when "test"
      IpReputationTestFeature.new
    else
      IpReputationBaseFeature.new
    end
  end
end
