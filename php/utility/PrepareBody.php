<?php
declare(strict_types=1);

// IpReputation SDK utility: prepare_body

class IpReputationPrepareBody
{
    public static function call(IpReputationContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
