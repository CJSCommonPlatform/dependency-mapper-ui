package uk.gov.justice.tools.ui;

import static junit.framework.TestCase.assertTrue;

import java.io.IOException;

import org.junit.Before;
import org.junit.Test;

public class ContextDependencyControllerTest {

    ContextDependencyController testObj;

    @Before
    public void setup() {
        System.setProperty("rootDirectory", "src/test/resources/");
        testObj = new ContextDependencyController();
    }

    @Test
    public void getDependencyGraph() throws IOException {

        String contextMapResponse = testObj.getDependencyGraph();
        assertTrue(contextMapResponse.contains("referencedata"));

    }

}