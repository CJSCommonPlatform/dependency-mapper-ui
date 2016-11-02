package uk.gov.justice.tools.healthcheck;

import static org.junit.Assert.*;

import uk.gov.justice.tools.ui.UIConfig;

import java.io.IOException;

import com.codahale.metrics.health.HealthCheck;
import org.junit.Test;


public class VersionHealthCheckServiceTest {
    @Test
    public void checkShouldReturnSucess() throws IOException {
        final UIConfig uiConfig = new UIConfig();
        final VersionHealthCheckService testObj = new VersionHealthCheckService(uiConfig);
        final HealthCheck.Result response = testObj.execute();
        assertTrue(response.isHealthy());
    }

    @Test
    public void checkShouldReturnFailure() throws IOException {
        final UIConfig uiConfig = new UIConfig();
        uiConfig.setVersionTxtPath("foo");
        final VersionHealthCheckService testObj = new VersionHealthCheckService(uiConfig);
        final HealthCheck.Result response = testObj.execute();
        assertFalse(response.isHealthy());
    }
}