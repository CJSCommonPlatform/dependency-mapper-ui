package uk.gov.justice.tools.ui;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path(value = "/version")
@Produces(MediaType.APPLICATION_JSON)
public class VersionController {

    private VersionNumber versionNumber = null;

    public VersionController(VersionNumber versionNumber){
        this.versionNumber = versionNumber;
    }

    @GET
    public VersionNumber getVersionAndBuildDateTime() throws IOException {

        // fallback to using Java API
        if (versionNumber.getVersion().isEmpty()) {
            Package aPackage = getClass().getPackage();

            versionNumber.setVersion(aPackage.getImplementationVersion());
            if (versionNumber.getVersion().isEmpty()) {
                versionNumber.setVersion(aPackage.getSpecificationVersion());
            }
        }

        return versionNumber;
    }

}
