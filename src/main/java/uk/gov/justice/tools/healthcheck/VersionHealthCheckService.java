package uk.gov.justice.tools.healthcheck;


import uk.gov.justice.tools.ui.UIConfig;

import java.io.InputStream;

public class VersionHealthCheckService extends HealthCheckService{

    private UIConfig uiConfig;

    public VersionHealthCheckService(UIConfig uiConfig) {
        this.uiConfig = uiConfig;
    }

    @Override
    protected Result check() throws Exception {
        Status status = null;
        InputStream is = getClass().getResourceAsStream(uiConfig.getVersionTxtPath());
        if (is != null) {
            status = new Status(true, "");
        }else{
            status = new Status(false, uiConfig.getVersionTxtPath() + " : Not found at classpath");
        }
        return getResult(status);
    }

    @Override
    public String getName() {
        return "VERSION_TXT_CHECK";
    }
}
