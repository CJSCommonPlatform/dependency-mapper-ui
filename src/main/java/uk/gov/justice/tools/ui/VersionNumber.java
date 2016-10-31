package uk.gov.justice.tools.ui;

public class VersionNumber {

    String version = "";
    String buildDateTime = "";

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        if(version != null) {
            this.version = version;
        }
    }

    public String getBuildDateTime() {
        return buildDateTime;
    }

    public void setBuildDateTime(String buildDateTime) {
        this.buildDateTime = buildDateTime;
    }

}
