package uk.gov.justice.tools.ui;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

@Path(value = "/ramlReport")
@Produces(MediaType.TEXT_HTML)
public class RamlStaticFileService {

    private UIConfig uiConfig;

    public RamlStaticFileService(UIConfig uiConfig) {
        this.uiConfig = uiConfig;
    }

    @GET
    public String getDependencyGraph(@QueryParam("ramlFileName")String ramlFileName) throws IOException {
        return new String(Files.readAllBytes(Paths.get(uiConfig.getRamlReportDir().concat(ramlFileName))));
    }
}
