package uk.gov.justice.tools.ui;


import io.dropwizard.Application;
import io.dropwizard.Configuration;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

public class ContextDependencyServiceBoot extends Application<Configuration> {
    //TODO : requires refactoring here, Suggested option would be one application.yml file having all properties defined there

    static String DEFAULT_RAML_REPORT_DIR = "/opt/raml-reports/";
    static String RAML_REPORT_DIR = System.getProperty("ramlReportDir", DEFAULT_RAML_REPORT_DIR);
    static String DEFAULT_FILE_URL = "/opt/contexts.json";
    static String FILE_URL = System.getProperty("filePath", DEFAULT_FILE_URL);

    static {
        if (null == System.getProperty("dw.server.applicationConnectors[0].port")) {
            System.setProperty("dw.server.applicationConnectors[0].port", "9999");
        }
    }
    //END TODO

    private final UIConfig uiConfig = new UIConfig();

    public static void main(String[] args) throws Exception {
        new ContextDependencyServiceBoot().run(args);
    }

    @Override
    public void initialize(Bootstrap<Configuration> bootstrap) {
        uiConfig.setFilePath(FILE_URL);
        uiConfig.setRamlReportDir(RAML_REPORT_DIR);
        bootstrap.addBundle(new AssetsBundle("/static", "/contextual", "index.html", "static"));
        //bootstrap.addBundle(new AssetsBundle("file:" +RAML_REPORT_DIR, "/raml-report*//**"));
    }

    @Override
    public void run(Configuration c, Environment environment) throws Exception {
        environment.jersey().register(new ContextDependencyController(uiConfig));
        environment.jersey().register(new RamlStaticFileService(uiConfig));
    }
}