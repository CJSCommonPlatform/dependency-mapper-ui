package uk.gov.justice.tools.ui;

import static org.junit.Assert.assertTrue;

import java.io.IOException;

import org.junit.Before;
import org.junit.Test;

public class RamlStaticFileServiceTest {

    RamlStaticFileService testObj;

    @Before
    public void setup() {
        final UIConfig uiConfig = new UIConfig();
        uiConfig.setRamlReportDir("src/test/resources/");
        testObj = new RamlStaticFileService(uiConfig);
    }

    @Test
    public void testGetRamlReport() throws IOException {

        final String response = testObj.getRamlReport("assignment-command-api.html");
        assertTrue(response.contains("html"));

    }

}
