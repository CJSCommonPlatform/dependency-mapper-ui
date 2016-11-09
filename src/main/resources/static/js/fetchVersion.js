define(['gateway/versionGateway'], function(gateway) {
    gateway.requestVersion(function (v) {
        $("#version").text("- Version " + v);
    });
})