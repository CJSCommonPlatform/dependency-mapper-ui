define(["lodash",
    "gateway/contextGraphGateway",
    "data/transform",
    "data/sigmaFormat/serviceGraphModeller",
    "render/graphBuilder",
    "data/predicates/isNeighbouringContextPredicate",
    "render/bindings/displayRamlEvent",
    "data/preProcessors/stripSecondLevelNodes",
    "services/loadModelService"],
    function (_, gateway, transform, graphObjectMapper, graphBuilder, predicate, displayRamlEvent,
              stripSecondLevelNodes, loadModelService) {

        var coreServices = loadModelService("coreService");

        var enrichGraphData = function (contextName) {
            return function (graph) {

                var firstOrphanLocation = {
                    "y": -125,
                    "x": 125
                };

                var orphanCount = 0;

                var serviceType = function(microServiceName){
                    return microServiceName.split("-")[1] + "-" + microServiceName.split("-")[2];
                };

                var isCoreServiceInCurrentContext = function(microServiceName){
                    var coreServiceNames = _.map(coreServices, "name");
                    var isCore =  microServiceName.split("-")[0] === contextName &&
                         _.includes(coreServiceNames, serviceType(microServiceName));
                    return isCore;
                }

                return {
                    edges: graph.edges,

                    nodes: _(graph.nodes).map(function (n, ix) {
                        n.size = 24;

                        var scaleFactor = 1.5;

                         if (n.id.split("-")[0] === contextName) {
                             n.color = "#ff0";
                             n.size = 36;
                         }

                        if(isCoreServiceInCurrentContext(n.id)){
                            var coreService = _.find(coreServices, { 'name': serviceType(n.id)});
                            n.x = coreService.location.x * scaleFactor;
                            n.y = coreService.location.y * scaleFactor;
                        } else if (!_.some(graph.edges, function(edge) {return edge.source === n.id || edge.target === n.id;})) {
                            n.x = firstOrphanLocation.x;
                            n.y = firstOrphanLocation.y + (orphanCount * 12);
                            orphanCount++;
                        }  else {
                            n.x = 50;
                            n.y = -100;
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
            $("#latestVersionOfServiceContainer").css("display", "none");

            var renderContextGraph = function (data) {
                var contextPredicate = predicate(contextName);
                var graph = transform(
                    data.microServices,
                    contextPredicate,
                    graphObjectMapper,
                    stripSecondLevelNodes(contextName));

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
