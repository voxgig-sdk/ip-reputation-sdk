# IpReputation SDK feature factory

from feature.base_feature import IpReputationBaseFeature
from feature.test_feature import IpReputationTestFeature


def _make_feature(name):
    features = {
        "base": lambda: IpReputationBaseFeature(),
        "test": lambda: IpReputationTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
