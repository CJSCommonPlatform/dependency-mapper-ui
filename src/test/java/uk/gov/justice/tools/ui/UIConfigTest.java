package uk.gov.justice.tools.ui;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;



import org.junit.Test;


public class UIConfigTest {


    UIConfig testObj = new UIConfig();
    private final String ARBITRARY_TEXT = "foo";

    @Test
    public void configHaveFilePathAttribute(){
        testObj.setFilePath(ARBITRARY_TEXT) ;
        assertThat(testObj.getFilePath(),is(ARBITRARY_TEXT));
    }

    @Test
    public void configHaveRamlReportDirAttribute(){
        testObj.setRamlReportDir(ARBITRARY_TEXT) ;
        assertThat(testObj.getRamlReportDir(),is(ARBITRARY_TEXT));
    }
    @Test
    public void getVersionTxtPath() {
        assertThat(testObj.getVersionTxtPath(),is("/version.txt"));
    }

}