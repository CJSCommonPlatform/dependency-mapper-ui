package uk.gov.justice.tools.healthcheck;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.io.IOException;

import org.junit.Test;

import com.codahale.metrics.health.HealthCheck.Result;

import uk.gov.justice.tools.healthcheck.RamlReportHealthCheckService;
import uk.gov.justice.tools.ui.UIConfig;

public class RamlReportHealthCheckServiceTest {



    @Test
    public void checkShouldReturnSucess() throws IOException {
        final UIConfig uiConfig = new UIConfig();
        uiConfig.setRamlReportDir("src/test/resources/");
        final RamlReportHealthCheckService testObj = new RamlReportHealthCheckService(uiConfig);
        final Result response = testObj.execute();
        assertTrue(response.isHealthy());

    }

    @Test
    public void checkShouldReturnFailure() throws IOException {
        final UIConfig uiConfig = new UIConfig();
        uiConfig.setRamlReportDir("src/test/non_exsisting_dir/");
        final RamlReportHealthCheckService testObj = new RamlReportHealthCheckService(uiConfig);
        final Result response = testObj.execute();
        assertFalse(response.isHealthy());

    }

}
