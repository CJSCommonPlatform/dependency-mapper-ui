package uk.gov.justice.tools.healthcheck;


import com.codahale.metrics.health.HealthCheck;

public abstract class HealthCheckService extends HealthCheck {

    public abstract String getName();

    protected Result getResult(final Status status) {
        return status.isHealthy ? Result.healthy() : Result.unhealthy(status.message);
    }

    protected class Status {
        boolean isHealthy;
        String message;

        public Status(boolean isHealthy, String message) {
            this.isHealthy = isHealthy;
            this.message = message;
        }
    }
}
