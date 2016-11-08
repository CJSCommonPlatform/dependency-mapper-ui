define(["gateway/contextGraphGateway", "data/transform", "data/sigmaFormat/contextGraphModeller", "render/graphBuilder", "render/bindings/renderServiceGraphEvent"],
    function(gateway, transform, graphObjectMapper, graphBuilder, renderServiceGraphEvent) {

    var renderContextGraph = function(data) {
        var formattedContextList = transform(data.microServices, function() {return true;}, graphObjectMapper, _.identity);

        $("#content").empty();
        $("h1").text("Dependency graph");
        $("#breadcrumbs").css("display", "none");

        graphBuilder()
            .withDraggableNodes()
            .usingNoverlapLayout()
            .withPreprocessor(enrichGraphData)
            .withClickHandler(renderServiceGraphEvent)
            .renderWithData(formattedContextList);

        $("#breadcrumbs").off("click");

        $("#breadcrumbs").click(function() {
            $("[data-custom-event='shrinkable']").removeClass("col-md-6").addClass("col-md-12");
            renderContextGraph(data);
            $("#ramlDetails").empty();
        });
    };

    gateway.requestData(renderContextGraph)

    var enrichGraphData = function(graph) {
        return {
            edges: graph.edges,

            nodes: graph.nodes.map(function(n, ix) {
                var theta = ((2 * Math.PI)/graph.nodes.length)*ix
                n.y = Math.cos(theta);
                n.x = Math.sin(theta);
                return $.extend(n, {size: 24});
            })};
    };
});


