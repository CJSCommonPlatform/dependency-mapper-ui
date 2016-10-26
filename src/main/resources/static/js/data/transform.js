define(["lodash", "data/graphObjectMapper"], function(_, graphObject) {
    var extract = function(context) {
        var dependencies = context.dependencies ?
            _.map(context.dependencies, function(d) {
                return {microService: d.microService}
            }) : [];

        var rawNodes = _.concat(dependencies, context);
        var newNodes = _.map(rawNodes, graphObject.extractNode);

        var newEdges = context.dependencies ? _.map(context.dependencies, _.curry(graphObject.extractEdge)(context)) : [];

        return {
            nodes: newNodes,
            edges: newEdges
        };
    };

    var reduce = function(accumulatedGraph, newGraph) {
        var processedGraph = extract(newGraph);

        var currentListOfNodes = accumulatedGraph.nodes;

        _.forEach(processedGraph.nodes, function(newNode) {
            var possibleDuplicateNode = _.find(currentListOfNodes, function(node) {
                return node.id === newNode.id;
            });

            if(possibleDuplicateNode) {
                possibleDuplicateNode.version = possibleDuplicateNode.version || newNode.version
            } else {
                currentListOfNodes.push(newNode);
            }
        });


        return {
            nodes: currentListOfNodes,
            edges: _.union(accumulatedGraph.edges, processedGraph.edges)
        }
    };

    return function (microserviceList)  {
        var emptyGraph = {
            nodes: [],
            edges: []
        };

        return _.reduce(microserviceList, reduce, emptyGraph);
    }
});

