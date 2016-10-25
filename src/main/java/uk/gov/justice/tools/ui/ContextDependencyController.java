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

    static String FILENAME = "contexts.json";
    static String DEFAULT_ROOT_DIRECTORY = "/opt/";
    static String ROOT_DIRECTORY = System.getProperty("rootDirectory", DEFAULT_ROOT_DIRECTORY);
    static String FILE_URL = ROOT_DIRECTORY + FILENAME;

    @RequestMapping(method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public String getDependencyGraph() throws IOException {

        return new String(Files.readAllBytes(Paths.get(FILE_URL)));

    }

    @Override
    public void afterPropertiesSet() throws Exception {
        Assert.isTrue(Files.isReadable(Paths.get(ROOT_DIRECTORY)), "Please provide -DrootDirectory system property having read permission");
        Assert.isTrue(Files.isReadable(Paths.get(FILE_URL)), "Root does not have valid context file called 'contexts.json', PATH provided by user:  " + FILE_URL);
    }
}
