# IpReputation SDK utility: make_context
require_relative '../core/context'
module IpReputationUtilities
  MakeContext = ->(ctxmap, basectx) {
    IpReputationContext.new(ctxmap, basectx)
  }
end
