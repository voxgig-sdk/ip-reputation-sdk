# IpReputation SDK utility: make_context

from ipreputation_sdk.core.context import IpReputationContext


def make_context_util(ctxmap, basectx):
    return IpReputationContext(ctxmap, basectx)
