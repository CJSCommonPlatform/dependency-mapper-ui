package uk.gov.justice.tools.healthcheck;

import uk.gov.justice.tools.ui.UIConfig;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.codahale.metrics.health.HealthCheck;

public class JsonFileHealthCheckService extends HealthCheck {

	UIConfig uiConfig = new UIConfig();

	public JsonFileHealthCheckService(UIConfig uiConfig) {
		this.uiConfig = uiConfig;
	}

	@Override
	protected Result check() throws Exception {
		Status status =null;
		Path jsonFilePath = Paths.get(uiConfig.getFilePath());
		if (!Files.exists(jsonFilePath)) {
			status = new Status(false,"'filePath : " + uiConfig.getFilePath() + "' does not exists ");
		} else if (!Files.isReadable(jsonFilePath)) {
			status = new Status(false,uiConfig.getFilePath() + ": Permission  denied");
		}else{
			status = new Status(true,"");
		}
		return status.isHealthy ? Result.healthy() : Result.unhealthy(status.message);
	}


	private class Status{
		boolean isHealthy ;
		String message ;

		public Status(boolean isHealthy, String message) {
			this.isHealthy = isHealthy;
			this.message = message;
		}
	}
}