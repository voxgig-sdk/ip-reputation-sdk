# IpReputation SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

IpReputationUtility.registrar = ->(u) {
  u.clean = IpReputationUtilities::Clean
  u.done = IpReputationUtilities::Done
  u.make_error = IpReputationUtilities::MakeError
  u.feature_add = IpReputationUtilities::FeatureAdd
  u.feature_hook = IpReputationUtilities::FeatureHook
  u.feature_init = IpReputationUtilities::FeatureInit
  u.fetcher = IpReputationUtilities::Fetcher
  u.make_fetch_def = IpReputationUtilities::MakeFetchDef
  u.make_context = IpReputationUtilities::MakeContext
  u.make_options = IpReputationUtilities::MakeOptions
  u.make_request = IpReputationUtilities::MakeRequest
  u.make_response = IpReputationUtilities::MakeResponse
  u.make_result = IpReputationUtilities::MakeResult
  u.make_point = IpReputationUtilities::MakePoint
  u.make_spec = IpReputationUtilities::MakeSpec
  u.make_url = IpReputationUtilities::MakeUrl
  u.param = IpReputationUtilities::Param
  u.prepare_auth = IpReputationUtilities::PrepareAuth
  u.prepare_body = IpReputationUtilities::PrepareBody
  u.prepare_headers = IpReputationUtilities::PrepareHeaders
  u.prepare_method = IpReputationUtilities::PrepareMethod
  u.prepare_params = IpReputationUtilities::PrepareParams
  u.prepare_path = IpReputationUtilities::PreparePath
  u.prepare_query = IpReputationUtilities::PrepareQuery
  u.result_basic = IpReputationUtilities::ResultBasic
  u.result_body = IpReputationUtilities::ResultBody
  u.result_headers = IpReputationUtilities::ResultHeaders
  u.transform_request = IpReputationUtilities::TransformRequest
  u.transform_response = IpReputationUtilities::TransformResponse
}
