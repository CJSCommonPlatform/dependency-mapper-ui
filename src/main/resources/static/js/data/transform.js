define(["lodash"], function(_) {

    var fullMicroserviceData = function(microserviceList) {
        return function(node) {
            var possibleFullNode = _.find(microserviceList, function(fullNode) { return node.microService === fullNode.microService});
            if (possibleFullNode) {
                node.version = node.version ? node.version : possibleFullNode.version;
                node.ramlDocument = node.ramlDocument ? node.ramlDocument : possibleFullNode.ramlDocument
                node.servicePomVersion = node.servicePomVersion ? node.servicePomVersion : possibleFullNode.servicePomVersion;
            }
            return node;
        }
    };

    var extract = function(graphModeller, context, microserviceList) {
        var enrichData = fullMicroserviceData(microserviceList);
        var dependencies = context.consumedBy ? context.consumedBy : [];

        var rawNodes = _.map(_.concat(dependencies, context), enrichData);
        var newNodes = _.map(rawNodes, graphModeller.extractNode);

        var newEdges = _.filter(context.consumedBy ? _.map(context.consumedBy, _.curry(graphModeller.extractEdge)(context)) : []);

        return {
            nodes: newNodes,
            edges: newEdges
        };
    };

    var reduceUsing = function(graphModeller, microserviceList) {
        return function (accumulatedGraph, newContext) {
            var processedGraph = extract(graphModeller, newContext, microserviceList);

            var currentListOfNodes = accumulatedGraph.nodes;

            _.forEach(processedGraph.nodes, function (newNode) {
                var possibleDuplicateNode = _.find(currentListOfNodes, function (node) {
                    return node.id === newNode.id;
                });

                if (possibleDuplicateNode && !possibleDuplicateNode.version) {
                    possibleDuplicateNode.version = newNode.version;
                    possibleDuplicateNode.customHover = newNode.customHover;
                    possibleDuplicateNode.ramlDocument = newNode.ramlDocument;
                    possibleDuplicateNode.servicePomVersion = newNode.servicePomVersion;
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

        return _.reduce(filteredNodes, reduceUsing(graphModeller, microserviceList), emptyGraph);
    }
});