define(["lodash"], function(_) {
    var extract = function(graphObject, context) {
        var dependencies = context.consumedBy ? context.consumedBy : [];

        var rawNodes = _.concat(dependencies, context);
        var newNodes = _.map(rawNodes, graphObject.extractNode);

        var newEdges = _.filter(context.consumedBy ? _.map(context.consumedBy, _.curry(graphObject.extractEdge)(context)) : []);

        return {
            nodes: newNodes,
            edges: newEdges
        };
    };

    var reduceUsing = function(graphObjectMapper) {
        return function (accumulatedGraph, newGraph) {
            var processedGraph = extract(graphObjectMapper, newGraph);

            var currentListOfNodes = accumulatedGraph.nodes;

            _.forEach(processedGraph.nodes, function (newNode) {
                var possibleDuplicateNode = _.find(currentListOfNodes, function (node) {
                    return node.id === newNode.id;
                });

                if (possibleDuplicateNode && !possibleDuplicateNode.version) {
                    possibleDuplicateNode.version = newNode.version;
                    possibleDuplicateNode.customHover = newNode.id + " (v" + newNode.version + ")";
                } else if (!possibleDuplicateNode) {
                    currentListOfNodes.push(newNode);
                }
            });

            return {
                nodes: currentListOfNodes,
                edges: _.union(accumulatedGraph.edges, processedGraph.edges)
            }
        }
    };

    return function(microserviceList, predicate, graphObjectMapper)  {
        var emptyGraph = {
            nodes: [],
            edges: []
        };

        var filteredNodes = _.filter(microserviceList, predicate);

        return _.reduce(filteredNodes, reduceUsing(graphObjectMapper), emptyGraph);
    }
});