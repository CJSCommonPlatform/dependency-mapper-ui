package uk.gov.justice.tools.ui;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;


@Controller
@RequestMapping("/contextGraph")
public class ContextDependencyController {

    static String FILENAME = "contexts.json";
    static String DEFAULT_ROOT_DIRECTORY = "/opt/";
    static String ROOT_DIRECTORY = System.getProperty("rootDirectory", DEFAULT_ROOT_DIRECTORY);

    @RequestMapping(method = RequestMethod.GET, produces = "application/json")
    public
    @ResponseBody
    String getDependencyGraph() {

        String fileContents = "";

        try {
            fileContents = new String(Files.readAllBytes( Paths.get(ROOT_DIRECTORY + FILENAME)));
        } catch (IOException e) {
            e.printStackTrace();
        }

        return fileContents;
    }

}
