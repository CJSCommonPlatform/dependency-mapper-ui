define([], function () {

    var displayRamlMissingWarning = function() {
        $("#ramlDetails").empty().html("<h1>No RAML document found</h1>");
    }

    return function (e) {
        var ramlDocument = e.data.node.ramlDocument;

        $("[data-custom-event='shrinkable']").removeClass("col-md-12").addClass("col-md-6");
        e.data.renderer.render();

        if (ramlDocument) {
            $("#ramlDetails").load("/ramlReport?ramlFileName=" + ramlDocument + " .row",
                function(response, status, xhr) {
                    if (status == "error" || status == "timeout") {
                        displayRamlMissingWarning();
                    }

                    $("#ramlDetails .container").removeClass("container");
                    $("#ramlDetails meta").remove();
                    $("#ramlDetails title").remove();
                }
            );
        } else {
            displayRamlMissingWarning();
        }
    }
});