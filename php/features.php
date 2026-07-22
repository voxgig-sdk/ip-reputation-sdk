<?php
declare(strict_types=1);

// IpReputation SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class IpReputationFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new IpReputationBaseFeature();
            case "test":
                return new IpReputationTestFeature();
            default:
                return new IpReputationBaseFeature();
        }
    }
}
