package uk.gov.justice.tools.healthcheck;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import uk.gov.justice.tools.ui.UIConfig;

public class JsonFileHealthCheckService extends HealthCheckService {

    private final UIConfig uiConfig;

    public JsonFileHealthCheckService(final UIConfig uiConfig) {
        this.uiConfig = uiConfig;
    }


    @Override
    protected Result check() throws Exception {
        Status status = null;
        final Path jsonFilePath = Paths.get(uiConfig.getFilePath());
        if (!Files.exists(jsonFilePath)) {
            status = new Status(false,
                            "'filePath : " + uiConfig.getFilePath() + "' does not exists ");
        } else if (!Files.isReadable(jsonFilePath)) {
            status = new Status(false, uiConfig.getFilePath() + ": Permission  denied");
        } else {
            status = new Status(true, "");
        }
        return getResult(status);
    }


    @Override
    public String getName() {
        return "CHECK_CONTEXT_JSON";
    }
}
