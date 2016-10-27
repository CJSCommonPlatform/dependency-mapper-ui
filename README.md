# Dependency Mapper - UI [![Build Status](https://travis-ci.org/CJSCommonPlatform/dependency-mapper-ui.svg?branch=master)](https://github.com/CJSCommonPlatform/dependency-mapper-ui)

Prerequisites:

* Context map file is at provided filePath, default is `/opt/contexts.json`. This can be overridden by sending the system property as a parameter  e.g.:

`java -DfilePath='/home/robert/dev/dependency-mapper-ui/src/test/resources/contexts.json' -jar target/dependency-mapper-ui-0.0.1-SNAPSHOT.jar`

* RAML report dir is at provided ramlReportDir, default is `/opt/raml-reports/`. This can be overridden by sending the system property as a parameter  e.g.:

`java -DfilePath='/home/robert/dev/dependency-mapper-ui/src/test/resources/contexts.json' -DramlReportDir='/opt/ext-resources/' -jar target/dependency-mapper-ui-0.0.1-SNAPSHOT.jar`

Execute following steps to build and start the service

1. `mvn package`
2. `java -jar target/dependency-mapper-ui-0.0.1-SNAPSHOT.jar` 
3. Open URL "http://localhost:9999/contextGraph", should return JSON payload

Note:

1. Default HTTP port is '9999', can be changed by setting system property e.g -Dserver.port=9998
