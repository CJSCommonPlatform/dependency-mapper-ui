package uk.gov.justice.tools.healthcheck;

import com.codahale.metrics.health.HealthCheck;

public class HealthCheckService extends HealthCheck {


	@Override
	protected Result check() throws Exception {
		return Result.healthy();
	}
}