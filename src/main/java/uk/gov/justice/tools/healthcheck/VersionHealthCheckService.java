package uk.gov.justice.tools.healthcheck;


import java.io.InputStream;

import uk.gov.justice.tools.ui.UIConfig;

public class VersionHealthCheckService extends HealthCheckService {

    private final UIConfig uiConfig;

    public VersionHealthCheckService(final UIConfig uiConfig) {
        this.uiConfig = uiConfig;
    }

    @Override
    protected Result check() throws Exception {
        Status status = null;
        final InputStream is = getClass().getResourceAsStream(uiConfig.getVersionTxtPath());
        if (is != null) {
            status = new Status(true, "");
        } else {
            status = new Status(false, uiConfig.getVersionTxtPath() + " : Not found at classpath");
        }
        return getResult(status);
    }

    @Override
    public String getName() {
        return "CHECK_VERSION_TXT";
    }
}
