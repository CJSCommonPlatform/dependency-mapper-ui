# Dependency Mapper - UI [![Build Status](https://travis-ci.org/CJSCommonPlatform/dependency-mapper-ui.svg?branch=master)](https://github.com/CJSCommonPlatform/dependency-mapper-ui)

Prerequisites:

1. File `contexts.json` is in the rootDirectory, default is "/opt/". This can be overridden by sending the system property as a paramater e.g.:

`java -DrootDirectory='/home/robert/dev/dependency-mapper-ui/src/test/resources/' -jar dependency-mapper-ui-0.0.1-SNAPSHOT.jar`

Execute following steps to build and start the serivce

1. `mnv package`
2. `java -jar target/dependency-mapper-ui-0.0.1-SNAPSHOT.jar` 
3. Open URL "http://localhost:9999/contextGraph", should return JSON payload
