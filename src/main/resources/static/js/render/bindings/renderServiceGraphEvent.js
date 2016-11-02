define(["gateway/contextGraphGateway", "data/transform", "data/sigmaFormat/serviceGraphModeller", "render/graphBuilder", "data/predicates/isNeighbouringContextPredicate", "render/bindings/displayRamlEvent"],
    function(gateway, transform, graphObjectMapper, graphBuilder, predicate, displayRamlEvent) {

    return function(e) {
        var microserviceName = e.data.node.label;

        $("#content").empty();

        $("h1").text("Dependency graph for " + microserviceName);
        $("#breadcrumbs").css("display", "block");

        var renderContextGraph = function(data) {
            var graph = transform(data.microServices, predicate(microserviceName), graphObjectMapper);

            graphBuilder()
                .withDraggableNodes()
                .usingNoverlapLayout()
                .withPreprocessor(enrichGraphData)
                .withClickHandler(displayRamlEvent)
                .renderWithData(graph);
        };

        gateway.requestData(renderContextGraph)
    }
});
