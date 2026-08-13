# IpReputation SDK exists test

import pytest
from ipreputation_sdk import IpReputationSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = IpReputationSDK.test(None, None)
        assert testsdk is not None
