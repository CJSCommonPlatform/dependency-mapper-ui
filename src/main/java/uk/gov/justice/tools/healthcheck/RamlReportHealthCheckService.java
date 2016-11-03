package uk.gov.justice.tools.healthcheck;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import uk.gov.justice.tools.ui.UIConfig;

public class RamlReportHealthCheckService extends HealthCheckService {

    private final UIConfig uiConfig;

    public RamlReportHealthCheckService(final UIConfig uiConfig) {
        this.uiConfig = uiConfig;
    }

    @Override
    protected Result check() throws Exception {
        Status status = null;
        final Path ramlReportDir = Paths.get(uiConfig.getRamlReportDir());
        if (!Files.exists(ramlReportDir)) {
            status = new Status(false,
                            "'Directory : " + uiConfig.getRamlReportDir() + "' does not exists ");
        } else if (!Files.isReadable(ramlReportDir)) {
            status = new Status(false, uiConfig.getFilePath() + ": Permission  denied");
        } else if (!Files.isDirectory(ramlReportDir)) {
            status = new Status(false,
                            "'Directory : " + uiConfig.getRamlReportDir() + "' is not directory ");
        } else if (!Files.list(ramlReportDir).findFirst().isPresent()) {
            status = new Status(false,
                            "'Directory : " + uiConfig.getRamlReportDir() + "' is empty ");
        } else {
            status = new Status(true, "");
        }
        return getResult(status);
    }

    @Override
    public String getName() {
        return "CHECK_RAML_REPORT_DIRECTORY";
    }
}
