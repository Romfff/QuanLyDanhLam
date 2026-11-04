<?php
namespace Tests\Feature;
use Tests\TestCase;

class HealthCheckTest extends TestCase {
    public function test_healthz_endpoint_returns_ok() {
        $response = $this->get('/api/healthz');
        $response->assertStatus(200);
        $response->assertJsonStructure(['status', 'app', 'database', 'timestamp']);
    }
}
