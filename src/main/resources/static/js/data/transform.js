define(["lodash"], function(_) {
    var extract = function(graphModeller, context) {
        var dependencies = context.consumedBy ? context.consumedBy : [];

        var rawNodes = _.concat(dependencies, context);
        var newNodes = _.map(rawNodes, graphModeller.extractNode);

        var newEdges = _.filter(context.consumedBy ? _.map(context.consumedBy, _.curry(graphModeller.extractEdge)(context)) : []);

        return {
            nodes: newNodes,
            edges: newEdges
        };
    };

    var reduceUsing = function(graphModeller) {
        return function (accumulatedGraph, newContext) {
            var processedGraph = extract(graphModeller, newContext);

            var currentListOfNodes = accumulatedGraph.nodes;

            _.forEach(processedGraph.nodes, function (newNode) {
                var possibleDuplicateNode = _.find(currentListOfNodes, function (node) {
                    return node.id === newNode.id;
                });

                if (possibleDuplicateNode && !possibleDuplicateNode.version) {
                    possibleDuplicateNode.version = newNode.version;
                    possibleDuplicateNode.customHover = newNode.customHover;
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

    return function(microserviceList, predicate, graphModeller, preProcessor)  {
        var emptyGraph = {
            nodes: [],
            edges: []
        };

        var filteredNodes = _(microserviceList).filter(predicate).map(preProcessor).value();

        return _.reduce(filteredNodes, reduceUsing(graphModeller), emptyGraph);
    }
});