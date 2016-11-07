define([], function () {
    return function (e) {
        var microserviceName = e.data.node.label,
            ramlFileName = "";
        if (microserviceName != "") {
            ramlFileName = microserviceName.replace(" ", "-");

            $.ajax({
                statusCode: {
                    500: function () {
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