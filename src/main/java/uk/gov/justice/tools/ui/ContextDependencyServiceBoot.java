package uk.gov.justice.tools.ui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

@SpringBootApplication
public class ContextDependencyServiceBoot extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(ContextDependencyServiceBoot.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(ContextDependencyServiceBoot.class);
    }

}
