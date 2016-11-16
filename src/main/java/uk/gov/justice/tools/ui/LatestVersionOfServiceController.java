package uk.gov.justice.tools.ui;


import uk.gov.justice.maven.rules.domain.Artifact;
import uk.gov.justice.maven.rules.domain.ArtifactoryInfo;
import uk.gov.justice.maven.rules.service.ArtifactUrlBuilder;
import uk.gov.justice.maven.rules.service.ArtifactoryClient;
import uk.gov.justice.maven.rules.service.ArtifactoryParser;

import java.io.IOException;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.maven.model.Dependency;
import org.apache.maven.plugin.logging.SystemStreamLog;

@Path(value = "/latestVersionOfService")
@Produces(MediaType.TEXT_PLAIN)
public class LatestVersionOfServiceController {

    //TODO: externalise
    private static final String ARTIFACTORY_URL = "http://10.124.22.24:8081/artifactory";
    private static final String PROXY_HOST = "10.224.23.8";
    private static final int PROXY_PORT = 3128;

    private static final SystemStreamLog LOG = new SystemStreamLog();//TODO: remove logging?

    @GET
    public String getLatestVersionOfServiceController() throws IOException {

        ArtifactoryClient client = new ArtifactoryClient(new ArtifactUrlBuilder(), ARTIFACTORY_URL, PROXY_HOST, PROXY_PORT, LOG);

        Dependency dependency = new Dependency();
        dependency.setGroupId("uk.gov.moj.cpp.common");
        dependency.setArtifactId("service-parent-pom");

        String payload = client.findArtifactInfo(dependency);

        ArtifactoryInfo artifactVersionList = new ArtifactoryParser(LOG).parse(payload);

        artifactVersionList.getResults().sort(Artifact.reverseComparator);

        Artifact lastReleasedArtifactVersion = artifactVersionList.getResults().get(0);

        return lastReleasedArtifactVersion.getVersion();

    }

}