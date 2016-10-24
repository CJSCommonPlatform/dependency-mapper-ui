package uk.gov.justice.tools.ui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

@SpringBootApplication
public class ContextDependencyService extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(ContextDependencyService.class, args);
	}
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(ContextDependencyService.class);
	}
}
