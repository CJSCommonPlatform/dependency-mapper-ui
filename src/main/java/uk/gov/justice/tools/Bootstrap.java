package uk.gov.justice.tools;


import uk.gov.justice.tools.healthcheck.HealthCheckService;

import io.dropwizard.Application;
import io.dropwizard.Configuration;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.setup.Environment;
import uk.gov.justice.tools.healthcheck.HealthCheckController;
import uk.gov.justice.tools.ui.ContextDependencyController;
import uk.gov.justice.tools.ui.RamlStaticFileService;
import uk.gov.justice.tools.ui.UIConfig;


public class Bootstrap extends Application<Configuration> {

    static String DEFAULT_RAML_REPORT_DIR = "/opt/raml-reports/";
    static String RAML_REPORT_DIR = System.getProperty("ramlReportDir", DEFAULT_RAML_REPORT_DIR);
    static String DEFAULT_FILE_URL = "/opt/contexts.json";
    static String FILE_URL = System.getProperty("filePath", DEFAULT_FILE_URL);



    private final UIConfig uiConfig = new UIConfig();

    public static void main(final String[] args) throws Exception {
        new Bootstrap()
                        .run(new String[] {"server", "src/main/resources/configuration.yaml"});
    }

    @Override
    public void initialize(final io.dropwizard.setup.Bootstrap bootstrap) {
        uiConfig.setFilePath(FILE_URL);
        uiConfig.setRamlReportDir(RAML_REPORT_DIR);
        bootstrap.addBundle(new AssetsBundle("/static", "/static", "index.html", "static"));
        // bootstrap.addBundle(new AssetsBundle("file:" +RAML_REPORT_DIR, "/raml-report*//**"));

    }

    @Override
    public void run(final Configuration c, final Environment environment) throws Exception {
        environment.jersey().register(new ContextDependencyController(uiConfig));
        environment.jersey().register(new RamlStaticFileService(uiConfig));

        // Run multiple health checks
        environment.healthChecks().register("JSON_ROOT_DIRECTORY_CHECK",new HealthCheckService(uiConfig));

     // Run multiple health checks
        environment.jersey().register(new HealthCheckService(uiConfig));
    }
}