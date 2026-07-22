package voxgigipreputationsdk

import (
	"github.com/voxgig-sdk/ip-reputation-sdk/go/core"
	"github.com/voxgig-sdk/ip-reputation-sdk/go/entity"
	"github.com/voxgig-sdk/ip-reputation-sdk/go/feature"
	_ "github.com/voxgig-sdk/ip-reputation-sdk/go/utility"
)

// Type aliases preserve external API.
type IpReputationSDK = core.IpReputationSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type IpReputationEntity = core.IpReputationEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type IpReputationError = core.IpReputationError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewDetailEntityFunc = func(client *core.IpReputationSDK, entopts map[string]any) core.IpReputationEntity {
		return entity.NewDetailEntity(client, entopts)
	}
	core.NewIpReputationEntityFunc = func(client *core.IpReputationSDK, entopts map[string]any) core.IpReputationEntity {
		return entity.NewIpReputationEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewIpReputationSDK = core.NewIpReputationSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewIpReputationSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *IpReputationSDK  { return NewIpReputationSDK(nil) }
func Test() *IpReputationSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
