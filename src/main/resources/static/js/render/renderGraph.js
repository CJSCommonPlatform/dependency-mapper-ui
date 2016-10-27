var graphSettings = {
    renderers: [
        {
            container: document.getElementById('content'),
            type: 'canvas'
        }
    ]
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
        sigma.settings.autoRescale = true;
        sigma.settings.defaultNodeColor = "#9cf";
        sigma.settings.labelThreshold = 1;
        sigma.settings.minNodeSize = 24;
        sigma.settings.minEdgeSize = 4;
        sigma.settings.sideMargin = 24;

        sigma.settings.defaultEdgeType = "curvedArrow";

        var graphData = enrichGraphData(graph);

        s = new sigma(
            $.extend(graphSettings, {graph: graphData})
        );

        var config = {
            nodeMargin: 12,
            scaleNodes: 1.3,
            duration: 2000
        };

        var listener = s.configNoverlap(config);
        s.startNoverlap();

        var dragListener = sigma.plugins.dragNodes(s, s.renderers[0]);
    }
});


