define(["lodash", "data/graphObjectMapper"], function(_, graphObject) {
    var extract = function(context) {
        var dependencies = context.consumedBy ?
            _.map(context.consumedBy, function(d) {
                return {microService: d.microService}
            }) : [];

        var rawNodes = _.concat(dependencies, context);
        var newNodes = _.map(rawNodes, graphObject.extractNode);

        var newEdges = context.consumedBy ? _.map(context.consumedBy, _.curry(graphObject.extractEdge)(context)) : [];

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

            if(possibleDuplicateNode && !possibleDuplicateNode.version) {
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
    };

    return function(microserviceList, predicate)  {
        var emptyGraph = {
            nodes: [],
            edges: []
        };

        return _.reduce(_.filter(microserviceList, predicate), reduce, emptyGraph);
    }
});