<?php
declare(strict_types=1);

// IpReputation SDK exists test

require_once __DIR__ . '/../ipreputation_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = IpReputationSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
