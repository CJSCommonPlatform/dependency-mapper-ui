package uk.gov.justice.tools.ui;

import static org.junit.Assert.assertTrue;

import java.io.IOException;

import org.junit.Before;
import org.junit.Test;

public class ContextDependencyControllerTest {

    ContextDependencyController testObj;

    @Before
    public void setup() {
        final UIConfig uiConfig = new UIConfig();
        uiConfig.setFilePath("src/test/resources/contexts.json");
        testObj = new ContextDependencyController(uiConfig);
    }

    @Test
    public void getDependencyGraph() throws IOException {

        final String contextMapResponse = testObj.getDependencyGraph();
        assertTrue(contextMapResponse.contains("consumedBy"));

    }

}
