define([], function () {
    return function (e) {
        var microserviceName = e.data.node.label;

        $("[data-custom-event='shrinkable']").removeClass("col-md-12").addClass("col-md-6");
        e.data.renderer.render();

        if (microserviceName != "") {
            var ramlFileName = microserviceName.replace(" ", "-");

            $.ajax({
                statusCode: {
                    404: function () {
                        $("#ramlDetails").empty().html("<h1>No RAML document found</h1>");
                    }
                },
                url:"/ramlReport?ramlFileName=" + ramlFileName + ".html",
                async: false,
                success: function(data){
                    if(!!data){
                        $("#ramlDetails").empty().load("/ramlReport?ramlFileName=" + ramlFileName + ".html .row");
                    }
                }
            });
        }
    }
});