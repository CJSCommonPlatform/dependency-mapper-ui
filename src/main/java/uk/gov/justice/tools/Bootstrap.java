package uk.gov.justice.tools;

import io.dropwizard.Application;
import io.dropwizard.Configuration;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.setup.Environment;
import uk.gov.justice.tools.healthcheck.JsonFileHealthCheckService;
import uk.gov.justice.tools.healthcheck.RamlReportHealthCheckService;
import uk.gov.justice.tools.ui.ContextDependencyController;
import uk.gov.justice.tools.ui.RamlStaticFileService;
import uk.gov.justice.tools.ui.UIConfig;

public class Bootstrap extends Application<Configuration> {

    static String DEFAULT_RAML_REPORT_DIR = "/opt/raml-reports/";
    static String RAML_REPORT_DIR = System.getProperty("ramlReportDir", DEFAULT_RAML_REPORT_DIR);
    static String DEFAULT_FILE_URL = "/opt/contexts.json";
    static String FILE_URL = System.getProperty("filePath", DEFAULT_FILE_URL);

    private final UIConfig uiConfig = new UIConfig();

    static {
        if (null == System.getProperty("dw.server.applicationConnectors[0].port")) {
            System.setProperty("dw.server.applicationConnectors[0].port", "9999");
        }
        if (null == System.getProperty("dw.server.adminConnectors[0].port")) {
            System.setProperty("dw.server.adminConnectors[0].port", "9998");
        }
    }


    public static void main(final String[] args) throws Exception {
        new Bootstrap().run(new String[] {"server"});
    }

    @Override
    public void initialize(final io.dropwizard.setup.Bootstrap bootstrap) {
        uiConfig.setFilePath(FILE_URL);
        uiConfig.setRamlReportDir(RAML_REPORT_DIR);
        bootstrap.addBundle(new AssetsBundle("/static", "/static", "index.html", "static"));

    }

    @Override
    public void run(final Configuration c, final Environment environment) throws Exception {
        environment.jersey().register(new ContextDependencyController(uiConfig));
        environment.jersey().register(new RamlStaticFileService(uiConfig));

        // Run multiple health checks
        environment.healthChecks().register("JSON_ROOT_DIRECTORY_CHECK",
                        new JsonFileHealthCheckService(uiConfig));
        environment.healthChecks().register("RAML_REPORT_ROOT_DIRECTORY_CHECK",
                        new RamlReportHealthCheckService(uiConfig));

    }
}
