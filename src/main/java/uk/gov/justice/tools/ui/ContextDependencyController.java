package uk.gov.justice.tools.ui;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping("/contextGraph")
public class ContextDependencyController implements InitializingBean {

    static String DEFAULT_FILE_URL = "/opt/contexts.json";
    static String FILE_URL = System.getProperty("filePath", DEFAULT_FILE_URL);

    @RequestMapping(method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public String getDependencyGraph() throws IOException {

        return new String(Files.readAllBytes(Paths.get(FILE_URL)));

    }

    @Override
    public void afterPropertiesSet() throws Exception {
        Assert.isTrue(Files.isReadable(Paths.get(FILE_URL)), "Please provide -DfilePath system property with read permission, this must be for a valid context file provided by the user:  " + FILE_URL);
    }
}
