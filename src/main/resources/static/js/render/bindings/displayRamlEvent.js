define([], function () {
    return function (e) {
        var microserviceName = e.data.node.label,
            ramlFileName = "";
        if (microserviceName != "") {
            ramlFileName = microserviceName.replace(" ", "-");
            $("#ramlDetails").empty().load("/ramlReport?ramlFileName=" + ramlFileName + ".html .row");
        } else {
            $("#ramlDetails").empty().html("<h1>No RAML Document found</h1>");
        }
    }
});