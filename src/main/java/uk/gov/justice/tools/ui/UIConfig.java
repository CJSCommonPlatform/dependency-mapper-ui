package uk.gov.justice.tools.ui;


public class UIConfig {

    private String filePath;

    private String ramlReportDir;

    private String versionTxtPath = "/version.txt";

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getRamlReportDir() {
        return ramlReportDir;
    }

    public void setRamlReportDir(String ramlReportDir) {
        this.ramlReportDir = ramlReportDir;
    }

    public String getVersionTxtPath() {
        return versionTxtPath;
    }

    public void setVersionTxtPath(String versionTxtPath) {
        this.versionTxtPath = versionTxtPath;
    }
}
