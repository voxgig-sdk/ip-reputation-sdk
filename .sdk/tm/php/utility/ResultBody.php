<?php
declare(strict_types=1);

// IpReputation SDK utility: result_body

class IpReputationResultBody
{
    public static function call(IpReputationContext $ctx): ?IpReputationResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
