define(["lodash", "gateway/contextGraphGateway", "data/transform", "data/sigmaFormat/serviceGraphModeller", "render/graphBuilder", "data/predicates/isNeighbouringContextPredicate", "render/bindings/displayRamlEvent"],
    function (_, gateway, transform, graphObjectMapper, graphBuilder, predicate, displayRamlEvent) {

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
                            var theta = ((2 * Math.PI) / graph.nodes.length) * ix;
                            n.y = Math.cos(theta);
                            n.x = Math.sin(theta);


                            // if (n.id.split("-")[0] === microserviceName) {
                            //     n.y = Math.random();
                            //     n.x = 0;
                            // }
                        }

                        return n;
                    }).filter().value()
                };
            };
        };



        return function (e) {
            var microserviceName = e.data.node.label;

            $("#content").empty();

            $("h1").text("Dependency graph for " + microserviceName);
            $("#breadcrumbs").css("display", "block");

            var renderContextGraph = function (data) {
                var contextPredicate = predicate(microserviceName);
                var graph = transform(data.microServices, contextPredicate, graphObjectMapper);

                graphBuilder()
                    .withDraggableNodes()
                    .usingNoverlapLayout()
                    .withPreprocessor(enrichGraphData(microserviceName))
                    .withClickHandler(displayRamlEvent)
                    .renderWithData(graph);
            };

            gateway.requestData(renderContextGraph)
        };
    });
