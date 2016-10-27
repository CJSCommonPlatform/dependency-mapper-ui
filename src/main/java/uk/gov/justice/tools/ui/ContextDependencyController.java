package uk.gov.justice.tools.ui;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path(value = "/contextGraph")
@Produces(MediaType.APPLICATION_JSON)
public class ContextDependencyController {

    private UIConfig uiConfig;

    public ContextDependencyController(UIConfig uiConfig) {
        this.uiConfig = uiConfig;
    }

    @GET
    public String getDependencyGraph() throws IOException {
        return new String(Files.readAllBytes(Paths.get(uiConfig.getFilePath())));
    }
}
