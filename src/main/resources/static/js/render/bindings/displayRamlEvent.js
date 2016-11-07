define([], function () {
    return function (e) {
        var microserviceName = e.data.node.label;

        $("[data-custom-event='shrinkable']").removeClass("col-md-12").addClass("col-md-6");
        e.data.renderer.render();

        if (microserviceName != "") {
            var ramlFileName = microserviceName.replace(" ", "-");
            $("#ramlDetails").empty().load("/ramlReport?ramlFileName=" + ramlFileName + ".html .row");
        } else {
            $("#ramlDetails").empty().html("<h1>No RAML Document found</h1>");
        }
    }
});