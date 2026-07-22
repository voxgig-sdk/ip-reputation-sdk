-- IpReputation SDK error

local IpReputationError = {}
IpReputationError.__index = IpReputationError


function IpReputationError.new(code, msg, ctx)
  local self = setmetatable({}, IpReputationError)
  self.is_sdk_error = true
  self.sdk = "IpReputation"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function IpReputationError:error()
  return self.msg
end


function IpReputationError:__tostring()
  return self.msg
end


return IpReputationError
