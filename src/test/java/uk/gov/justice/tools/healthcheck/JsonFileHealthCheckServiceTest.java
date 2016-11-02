package uk.gov.justice.tools.healthcheck;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.io.IOException;

import org.junit.Test;

import com.codahale.metrics.health.HealthCheck.Result;

import uk.gov.justice.tools.healthcheck.JsonFileHealthCheckService;
import uk.gov.justice.tools.ui.UIConfig;

public class JsonFileHealthCheckServiceTest {



    @Test
    public void checkShouldReturnSucess() throws IOException {
        final UIConfig uiConfig = new UIConfig();
        uiConfig.setFilePath("src/test/resources/contexts.json");
        final JsonFileHealthCheckService testObj = new JsonFileHealthCheckService(uiConfig);
        final Result response = testObj.execute();
        assertTrue(response.isHealthy());

    }

    @Test
    public void checkShouldReturnFailure() throws IOException {
        final UIConfig uiConfig = new UIConfig();
        uiConfig.setFilePath("src/test/non_exsisting_file.json");
        final JsonFileHealthCheckService testObj = new JsonFileHealthCheckService(uiConfig);
        final Result response = testObj.execute();
        assertFalse(response.isHealthy());

    }
}
