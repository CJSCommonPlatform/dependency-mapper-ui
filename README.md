# Dependency Mapper - UI [![Build Status](https://travis-ci.org/CJSCommonPlatform/dependency-mapper-ui.svg?branch=master)](https://github.com/CJSCommonPlatform/dependency-mapper-ui)

Prerequisites:

1. Context map file is at provided dmx.contexts.map.file, default is `/opt/contexts.json`. This can be overridden by sending the system property as a parameter  e.g.:

`java -Ddmx.contexts.map.file='/home/robert/dev/dependency-mapper-ui/src/test/resources/contexts.json' -jar target/dependency-mapper-ui-0.0.1-SNAPSHOT.jar `
2. RAML report dir is at provided dmx.raml.reports.dir, default is `/opt/raml-reports/`. This can be overridden by sending the system property as a parameter (you must include the trailing slash) e.g.:

`java -Ddmx.contexts.map.file=/home/robert/dev/dependency-mapper-ui/src/test/resources/contexts.json -Ddmx.raml.reports.dir=/opt/ext-resources/ -jar target/dependency-mapper-ui-0.0.1-SNAPSHOT.jar `


Execute following steps to build and start the service

1. `mvn clean package`
2. `java -jar target/dependency-mapper-ui-0.0.1-SNAPSHOT.jar ` 
3. Open URL "http://localhost:9999/contextGraph", should return JSON payload
4. Open URL "http://localhost:9999/mapper/", should return home page.

Note:

1. Default HTTP port for the application is `9999` and for admin (healthcheck) it is `9998`. These can be changed by setting system properties e.g `-Ddw.server.applicationConnectors[0].port=9090 -Ddw.server.adminConnectors[0].port=9091`. If you get the startup error `java.net.BindException: Address already in use` then you may be running the application already, if you want to run two instances in parallel you must change both the application and the admin ports. Ensure that you put all `-D` params before `-jar`. 
2. Added raml report microservice `http://localhost:9999/ramlReport?ramlFileName=index.html`, which takes ramlFileName as query parameter and return html contents. 
3. Health Check URL `http://localhost:9998/healthcheck?pretty=true`
