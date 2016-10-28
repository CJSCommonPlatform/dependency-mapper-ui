package uk.gov.justice.tools.ui;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path(value = "/version")
@Produces(MediaType.APPLICATION_JSON)
public class VersionController {


    String version = null;
    String buildDateTime = null;

    @GET
    public Response getVersionAndBuildDateTime() throws IOException {

        getVersion();

        Map versionMap = new HashMap();

        versionMap.put("version", version);
        versionMap.put("buildDateTime", buildDateTime);

        return Response.ok(versionMap).build();
    }

    public synchronized String getVersion() {

        // try to load from maven properties first
        try {
            Properties p = new Properties();
            InputStream is = getClass().getResourceAsStream("/version.txt");
            if (is != null) {
                p.load(is);
                version = p.getProperty("version", "");
                buildDateTime = p.getProperty("build.date", "");
            }
        } catch (Exception e) {
            // ignore
        }

        // fallback to using Java API
        if (version == null) {
            Package aPackage = getClass().getPackage();
            if (aPackage != null) {
                version = aPackage.getImplementationVersion();
                if (version == null) {
                    version = aPackage.getSpecificationVersion();
                }
            }
        }

        if (version == null) {
            // we could not compute the version so use a blank
            version = "";
        }

        return version;
    }


}
