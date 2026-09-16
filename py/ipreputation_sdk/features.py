# IpReputation SDK feature factory

from ipreputation_sdk.feature.base_feature import IpReputationBaseFeature
from ipreputation_sdk.feature.ratelimit_feature import IpReputationRatelimitFeature
from ipreputation_sdk.feature.retry_feature import IpReputationRetryFeature
from ipreputation_sdk.feature.test_feature import IpReputationTestFeature
from ipreputation_sdk.feature.timeout_feature import IpReputationTimeoutFeature


_FEATURES = {
    "base": lambda: IpReputationBaseFeature(),
    "ratelimit": lambda: IpReputationRatelimitFeature(),
    "retry": lambda: IpReputationRetryFeature(),
    "test": lambda: IpReputationTestFeature(),
    "timeout": lambda: IpReputationTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
