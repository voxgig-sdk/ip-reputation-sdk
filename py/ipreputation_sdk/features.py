# IpReputation SDK feature factory

from ipreputation_sdk.feature.base_feature import IpReputationBaseFeature
from ipreputation_sdk.feature.test_feature import IpReputationTestFeature


def _make_feature(name):
    features = {
        "base": lambda: IpReputationBaseFeature(),
        "test": lambda: IpReputationTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
