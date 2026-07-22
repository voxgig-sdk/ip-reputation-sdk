<?php
declare(strict_types=1);

// IpReputation SDK base feature

class IpReputationBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(IpReputationContext $ctx, array $options): void {}
    public function PostConstruct(IpReputationContext $ctx): void {}
    public function PostConstructEntity(IpReputationContext $ctx): void {}
    public function SetData(IpReputationContext $ctx): void {}
    public function GetData(IpReputationContext $ctx): void {}
    public function GetMatch(IpReputationContext $ctx): void {}
    public function SetMatch(IpReputationContext $ctx): void {}
    public function PrePoint(IpReputationContext $ctx): void {}
    public function PreSpec(IpReputationContext $ctx): void {}
    public function PreRequest(IpReputationContext $ctx): void {}
    public function PreResponse(IpReputationContext $ctx): void {}
    public function PreResult(IpReputationContext $ctx): void {}
    public function PreDone(IpReputationContext $ctx): void {}
    public function PreUnexpected(IpReputationContext $ctx): void {}
}
