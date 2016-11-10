define([], function () {
    return function (e) {
        var microserviceName = e.data.node.label;

        $("[data-custom-event='shrinkable']").removeClass("col-md-12").addClass("col-md-6");
        e.data.renderer.render();

        if (microserviceName != "") {
            var ramlFileName = microserviceName.replace(" ", "-");
            $("#ramlDetails").load("/ramlReport?ramlFileName=" + ramlFileName + ".html",
                function(response, status, xhr) {
                    if (status == "error" || status == "timeout") {
                        $(this).empty().html("<h1>No RAML document found</h1>");
                    }
                }
            );
        }
    }
});