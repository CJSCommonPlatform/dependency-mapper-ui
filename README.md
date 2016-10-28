# Dependency Mapper - UI [![Build Status](https://travis-ci.org/CJSCommonPlatform/dependency-mapper-ui.svg?branch=master)](https://github.com/CJSCommonPlatform/dependency-mapper-ui)

Prerequisites:

1. Context map file is at provided filePath, default is `/opt/contexts.json`. This can be overridden by sending the system property as a parameter  e.g.:

`java -DfilePath='/home/robert/dev/dependency-mapper-ui/src/test/resources/contexts.json' -jar target/dependency-mapper-ui-0.0.1-SNAPSHOT.jar `
2. RAML report dir is at provided ramlReportDir, default is `/opt/raml-reports/`. This can be overridden by sending the system property as a parameter  e.g.:

`java -DfilePath='/home/robert/dev/dependency-mapper-ui/src/test/resources/contexts.json' -DramlReportDir='/opt/ext-resources/' -jar target/dependency-mapper-ui-0.0.1-SNAPSHOT.jar `

Execute following steps to build and start the service

1. `mvn clean package`
2. `java -jar target/dependency-mapper-ui-0.0.1-SNAPSHOT.jar server` 
3. Open URL "http://localhost:9999/contextGraph", should return JSON payload
4. Open URL "http://localhost:9999/static/", should return home page.

Note:

1. Default HTTP port is '9999', can be changed by setting system property e.g -Ddw.server.applicationConnectors[0].port=9090
2. Added raml report microservice http://localhost:9999/ramlReport?ramlFileName=index.html, which takes ramlFileName as query parameter and return html contents. 
