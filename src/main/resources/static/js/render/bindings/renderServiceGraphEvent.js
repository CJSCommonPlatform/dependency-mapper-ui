define(["gateway/contextGraphGateway", "data/transform", "data/sigmaFormat/serviceGraphModeller", "render/graphBuilder", "data/predicates/isNeighbouringContextPredicate", "render/bindings/displayRamlEvent"],
    function (gateway, transform, graphObjectMapper, graphBuilder, predicate, displayRamlEvent) {

        var enrichGraphData = function (microserviceName) {
            return function (graph) {
                return {
                    edges: graph.edges,

                    nodes: graph.nodes.map(function (n, ix) {
                        if (n.id.split("-")[0] === microserviceName) {
                            n.color = "#ff0";
                            n.size = 36;
                        }

                        if (!_.some(graph.edges, function(edge) {return edge.source === n.id || edge.target === n.id;})) {
                            n.y = -6;
                            n.x = -6;
                        } else {
                            var theta = ((2 * Math.PI) / graph.nodes.length) * ix;
                            n.y = Math.cos(theta);
                            n.x = Math.sin(theta);

                            if (n.id.split("-")[0] === microserviceName) {
                                n.y = Math.random();
                                n.x = 0;
                            }
                        }

                        return n;
                    })
                };
            };
        };

        return function (e) {
            var microserviceName = e.data.node.label;

            $("#content").empty();

            $("h1").text("Dependency graph for " + microserviceName);
            $("#breadcrumbs").css("display", "block");

            var renderContextGraph = function (data) {
                var graph = transform(data.microServices, predicate(microserviceName), graphObjectMapper);

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
