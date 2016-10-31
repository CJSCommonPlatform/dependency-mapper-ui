package uk.gov.justice.tools.healthcheck;

import uk.gov.justice.tools.ui.UIConfig;

import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;

import com.codahale.metrics.health.HealthCheck;

public class RamlReportHealthCheckService extends HealthCheck {

	UIConfig uiConfig = new UIConfig();

	public RamlReportHealthCheckService(UIConfig uiConfig) {
		this.uiConfig = uiConfig;
	}

	@Override
	protected Result check() throws Exception {
		Status status = null;
		Path ramlReportDir = Paths.get(uiConfig.getRamlReportDir());
		if (!Files.exists(ramlReportDir)) {
			status = new Status(false, "'Directory : " + uiConfig.getRamlReportDir() + "' does not exists ");
		} else if (!Files.isReadable(ramlReportDir)) {
			status = new Status(false, uiConfig.getFilePath() + ": Permission  denied");
		} else if (!Files.isDirectory(ramlReportDir)) {
			status = new Status(false, "'Directory : " + uiConfig.getRamlReportDir() + "' is not directory ");
		} else {
			try (DirectoryStream<Path> dirStream = Files.newDirectoryStream(ramlReportDir)) {
				if (!dirStream.iterator().hasNext()) {
					status = new Status(false, "'Directory : " + uiConfig.getRamlReportDir() + "' is empty ");
				} else {
					status = new Status(true, "");
				}
			}
		}
		return status.isHealthy ? Result.healthy() : Result.unhealthy(status.message);
	}

	private class Status {
		boolean isHealthy;
		String message;

		public Status(boolean isHealthy, String message) {
			this.isHealthy = isHealthy;
			this.message = message;
		}
	}
}