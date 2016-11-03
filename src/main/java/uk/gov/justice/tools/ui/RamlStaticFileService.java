package uk.gov.justice.tools.ui;

import org.apache.commons.lang3.StringUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

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
    public String getRamlReport(@QueryParam("ramlFileName") String ramlFileName) throws IOException {
        if (StringUtils.isBlank(ramlFileName)) {
            ramlFileName = "index.html";
        }
        return new String(Files.readAllBytes(Paths.get(uiConfig.getRamlReportDir().concat(ramlFileName))));

    }

//    public static void main(String[] args) throws IOException {
//        RamlStaticFileService ramlStaticFileService = new RamlStaticFileService(null);
//        List<String> results = new ArrayList<String>();
//        File[] files = new File("D:\\MOJ\\dependency-mapper-ui\\src\\test\\resources").listFiles();
//        for (File file : files) {
//            if (file.isFile()) {
//                if(file.getName().endsWith(".html")){
//                    results.add(file.getName());
//                }
//            }
//        }
//        System.out.println(results);
//    }
}
