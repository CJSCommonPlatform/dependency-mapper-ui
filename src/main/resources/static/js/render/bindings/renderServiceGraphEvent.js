define(["lodash",
    "gateway/contextGraphGateway",
    "data/transform",
    "data/sigmaFormat/serviceGraphModeller",
    "render/graphBuilder",
    "data/predicates/isNeighbouringContextPredicate",
    "render/bindings/displayRamlEvent",
    "data/preProcessors/stripSecondLevelNodes"],
    function (_, gateway, transform, graphObjectMapper, graphBuilder, predicate, displayRamlEvent, stripSecondLevelNodes) {

        var enrichGraphData = function (microserviceName) {
            return function (graph) {

                var firstOrphanLocation = {
                    "y": -125,
                    "x": 125
                };

                var orphanCount = 0;

                return {
                    edges: graph.edges,

                    nodes: _(graph.nodes).map(function (n, ix) {
                        n.size=24;

                         if (n.id.split("-")[0] === microserviceName) {
                             n.color = "#ff0";
                             n.size = 36;
                         }
                        
                        if (!_.some(graph.edges, function(edge) {return edge.source === n.id || edge.target === n.id;})) {
                            n.y = firstOrphanLocation.y + (orphanCount * 12);
                            n.x = firstOrphanLocation.x;
                            orphanCount++;
                        } else {
                            var angleInRadians = ((2 * Math.PI) / graph.nodes.length) * ix;
                            var radius = 75;
                            n.y = Math.cos(angleInRadians) * radius;
                            n.x = Math.sin(angleInRadians) * radius;

                        }

                        return n;
                    }).filter().value()
                };
            };
        };



        return function (e) {
            var contextName = e.data.node.label;

            $("#content").empty();

            $("h1").text("Dependency graph for " + contextName);
            $("#breadcrumbs").css("display", "block");

            var renderContextGraph = function (data) {
                var contextPredicate = predicate(contextName);
                var graph = transform(data.microServices, contextPredicate, graphObjectMapper, stripSecondLevelNodes(contextName));

                graphBuilder()
                    .withDraggableNodes()
                    .usingNoverlapLayout()
                    .withPreprocessor(enrichGraphData(contextName))
                    .withClickHandler(displayRamlEvent)
                    .renderWithData(graph);
            };

            gateway.requestData(renderContextGraph)
        };
    });
