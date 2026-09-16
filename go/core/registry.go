package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewDetailEntityFunc func(client *IpReputationSDK, entopts map[string]any) IpReputationEntity

var NewIpReputationEntityFunc func(client *IpReputationSDK, entopts map[string]any) IpReputationEntity

