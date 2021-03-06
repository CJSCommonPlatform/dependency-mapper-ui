package uk.gov.justice.tools.ui;

import org.apache.commons.lang3.StringUtils;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Paths;

@Path(value = "/ramlReport")
@Produces(MediaType.TEXT_HTML)
public class RamlStaticFileService {

    private UIConfig uiConfig;

    public RamlStaticFileService(UIConfig uiConfig) {
        this.uiConfig = uiConfig;
    }

    @GET
    public String getRamlReport(@QueryParam("ramlFileName") String ramlFileName) throws IOException, WebApplicationException {
        if (StringUtils.isBlank(ramlFileName)) {
            ramlFileName = "index.html";
        }

        String fileContents = "";

        try{
            fileContents = new String(Files.readAllBytes(Paths.get(uiConfig.getRamlReportDir().concat(ramlFileName))));
        }catch(NoSuchFileException nsfe){
            throw new WebApplicationException(404);
        }

        return fileContents;

    }
}
