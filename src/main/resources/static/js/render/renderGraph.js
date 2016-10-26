var graphSettings = {
    sideMargin: 20,
    enableEdgeHovering: true,
    renderers: [
        {
            container: document.getElementById('content'),
            type: 'canvas'
        }
    ],
    maxEdgeSize: 4,
    labelThreshold: 1
};

var enrichGraphData = function(graph) {
    return {
        edges: graph.edges,

        nodes: graph.nodes.map(function(n, ix) {
            var theta = ((2 * Math.PI)/graph.nodes.length)*ix
            n.y = Math.cos(theta);
            n.x = Math.sin(theta);
            return $.extend(n, {size: 24});
        })};
};

define([], function() {
    return function(graph) {

        sigma.settings.minArrowSize = 8;
        //sigma.settings.autoRescale = false;
        sigma.settings.defaultNodeColor = "#9cf";

        sigma.settings.defaultEdgeType = "arrow";

        var graphData = enrichGraphData(graph);

        s = new sigma(
            $.extend(graphSettings, {graph: graphData})
        );

        var dragListener = sigma.plugins.dragNodes(s, s.renderers[0]);
    }
});


