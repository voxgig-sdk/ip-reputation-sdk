<?php
declare(strict_types=1);

// IpReputation SDK utility: result_headers

class IpReputationResultHeaders
{
    public static function call(IpReputationContext $ctx): ?IpReputationResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
