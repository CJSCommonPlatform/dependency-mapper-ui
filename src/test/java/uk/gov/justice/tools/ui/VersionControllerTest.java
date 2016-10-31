package uk.gov.justice.tools.ui;

import static org.hamcrest.core.Is.is;
import static org.junit.matchers.JUnitMatchers.containsString;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class VersionControllerTest {

    VersionController testObj;

    @Before
    public void setup() {

    }

    @Test
    public void isGetVersionResponseValidWhenObjectIsPopulated() throws Exception {

        //given
        VersionNumber expectedVersionNumber= new VersionNumber();
        expectedVersionNumber.setVersion("0.0.1-SNAPSHOT");
        expectedVersionNumber.setBuildDateTime("2016-10-31 10:35");

        testObj = new VersionController(expectedVersionNumber);

        //when
        VersionNumber actualVersionNumber = testObj.getVersionAndBuildDateTime();

        //then
        Assert.assertThat(actualVersionNumber.getVersion(), is(expectedVersionNumber.getVersion()));
        Assert.assertThat(actualVersionNumber.getBuildDateTime(), is(expectedVersionNumber.getBuildDateTime()));

    }

    @Test
    public void isGetVersionResponseValidWhenObjectIsNotPopulated() throws Exception {

        //given
        VersionNumber expectedVersionNumber = new VersionNumber();

        testObj = new VersionController(expectedVersionNumber);

        //when
        VersionNumber actualVersionNumber = testObj.getVersionAndBuildDateTime();

        //then
        Assert.assertThat(actualVersionNumber.getVersion(), is(""));
        Assert.assertThat(actualVersionNumber.getVersion(), is(expectedVersionNumber.getVersion()));

    }

}