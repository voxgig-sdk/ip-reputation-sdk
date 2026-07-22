<?php
declare(strict_types=1);

// IpReputation SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class IpReputationMakeContext
{
    public static function call(array $ctxmap, ?IpReputationContext $basectx): IpReputationContext
    {
        return new IpReputationContext($ctxmap, $basectx);
    }
}
