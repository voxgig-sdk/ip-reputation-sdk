# IpReputation SDK utility: make_context

from core.context import IpReputationContext


def make_context_util(ctxmap, basectx):
    return IpReputationContext(ctxmap, basectx)
