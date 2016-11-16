# Dependency Mapper - UI [![Build Status](https://travis-ci.org/CJSCommonPlatform/dependency-mapper-ui.svg?branch=master)](https://github.com/CJSCommonPlatform/dependency-mapper-ui)

Prerequisites:

## Java back-end command line override configuration

| Property | Default | Description | Example Override |
| --- | --- | --- | --- |
| dmx.contexts.map.file | `/opt/contexts.json` | Directory location AND file name where generated file will be published | -Ddmx.contexts.map.file=/opt/dmx/contexts1.json |
| dmx.raml.reports.dir | `/opt/raml-reports/` | RAML report dir | -Ddmx.raml.reports.dir=/opt/any/ |
| dmx.server.ui.port | `9999` | Default UI port | -Ddmx.server.ui.port=80 |
| dmx.server.admin.port | `9998` | Default Admin port | -Ddmx.server.ui.port=88 |

## Execute following steps to build and start the service
1. `mvn clean package`
2. `java -jar target/dependency-mapper-ui-0.0.1-SNAPSHOT.jar ` 
3. Open URL "http://localhost:9999/contextGraph", should return JSON payload
4. Open URL "http://localhost:9999/mapper/", should return home page.

## RAML Report Microservice
Added raml report microservice that takes ramlFileName as query parameter and return html contents.
`http://localhost:9999/ramlReport?ramlFileName=index.html`

## HealthCheck
Health Check URL: `http://localhost:9998/healthcheck?pretty=true`

## Notes:
1. Default HTTP port for the application is `9999` and for admin (healthcheck) it is `9998`. These can be changed by setting system properties as mentioned above.

## Troubleshooting
1. If you get the startup error `java.net.BindException: Address already in use` then you may be running the application already, if you want to run two instances in parallel you must change both the application and the admin ports.
