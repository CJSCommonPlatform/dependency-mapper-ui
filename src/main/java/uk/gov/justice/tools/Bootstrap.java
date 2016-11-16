package uk.gov.justice.tools;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import io.dropwizard.Application;
import io.dropwizard.Configuration;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.setup.Environment;
import uk.gov.justice.tools.healthcheck.HealthCheckService;
import uk.gov.justice.tools.healthcheck.JsonFileHealthCheckService;
import uk.gov.justice.tools.healthcheck.RamlReportHealthCheckService;
import uk.gov.justice.tools.healthcheck.VersionHealthCheckService;
import uk.gov.justice.tools.ui.ContextDependencyController;
import uk.gov.justice.tools.ui.LatestVersionOfServiceController;
import uk.gov.justice.tools.ui.RamlStaticFileService;
import uk.gov.justice.tools.ui.UIConfig;
import uk.gov.justice.tools.ui.VersionController;
import uk.gov.justice.tools.ui.VersionNumber;

public class Bootstrap extends Application<Configuration> {

    static String DEFAULT_RAML_REPORT_DIR = "/opt/raml-reports/";
    static String RAML_REPORT_DIR =
                    System.getProperty("dmx.raml.reports.dir", DEFAULT_RAML_REPORT_DIR);
    static String DEFAULT_FILE_URL = "/opt/contexts.json";
    static String FILE_URL = System.getProperty("dmx.contexts.map.file", DEFAULT_FILE_URL);

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
        bootstrap.addBundle(new AssetsBundle("/static", "/mapper", "index.html", "mapper"));

    }

    @Override
    public void run(final Configuration c, final Environment environment) throws Exception {
        environment.jersey().register(new ContextDependencyController(uiConfig));
        environment.jersey().register(new RamlStaticFileService(uiConfig));
        environment.jersey().register(new VersionController(getVersion()));
        environment.jersey().register(new LatestVersionOfServiceController());

        // register multiple health checks
        registerHealthCheckServices(environment);

    }

    private void registerHealthCheckServices(final Environment environment) {

        final HealthCheckService jsonFileHealthCheckService =
                        new JsonFileHealthCheckService(uiConfig);
        final HealthCheckService ramlReportHealthCheckService =
                        new RamlReportHealthCheckService(uiConfig);
        final HealthCheckService versionHealthCheckService =
                        new VersionHealthCheckService(uiConfig);

        environment.healthChecks().register(jsonFileHealthCheckService.getName(),
                        jsonFileHealthCheckService);
        environment.healthChecks().register(ramlReportHealthCheckService.getName(),
                        ramlReportHealthCheckService);
        environment.healthChecks().register(versionHealthCheckService.getName(),
                        versionHealthCheckService);
    }

    public VersionNumber getVersion() throws IOException {

        // try to load from maven properties
        final Properties p = new Properties();
        VersionNumber versionNumber = new VersionNumber();

        final InputStream is = getClass().getResourceAsStream(uiConfig.getVersionTxtPath());

        if (is != null) {
            p.load(is);
            versionNumber = new VersionNumber();
            versionNumber.setVersion(p.getProperty("version"));
            versionNumber.setBuildDateTime(p.getProperty("build.date"));
        }

        return versionNumber;

    }


}
