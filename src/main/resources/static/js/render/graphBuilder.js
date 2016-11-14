var setDefaultSettings = function() {
    sigma.settings.minArrowSize = 8;
    sigma.settings.autoRescale = true;
    sigma.settings.defaultNodeColor = "#9cf";
    sigma.settings.labelThreshold = 1;
    sigma.settings.minNodeSize = 24;
    sigma.settings.minEdgeSize = 4;
    sigma.settings.sideMargin = 24;
    sigma.settings.mouseWheelEnabled = false;
    sigma.settings.defaultEdgeType = "arrow";
    sigma.settings.replaceColor = '#ff0000';
};

var graphSettings = {
    renderers: [
        {
            container: document.getElementById('content'),
            type: 'canvas'
        }
    ]
};

/**
 *  Helper method to retrieve graph indexes
 */
sigma.classes.graph.addMethod('retrieveIndexes', function() {
    return {
        'inIndex': this.inNeighborsIndex,
        'outIndex': this.outNeighborsIndex,
        'allIndex': this.allNeighborsIndex,
        'inCount': this.inNeighborsCount,
        'outCount': this.outNeighborsCount,
        'allCount': this.allNeighborsCount
    }
});

/**
 * Helper function for replacing Nodes and edges colors
 *
 * @param s  Sigma instance
 * @param obj Inbound nodes to the target
 * @param color Overwrite color
 * @param target String target id
 */
function replaceColor(s, obj, color, target) {
    for (var i in obj) {
        s.graph.nodes().forEach(function (n) {
            if (i === n.id){
                n.color = color;
                s.graph.edges().forEach(function (e) {
                    if (n.id === e.source && target === e.target)
                        e.color = color;
                });
            }
        });
    }
}

define(["render/custom-sigma/sigma.addZoom"], function(addZoomCapability) {

    return function () {
        var _clickHandler;
        var _noverlap = false;
        var _draggableNodes = false;
        var _preProcessor = function (x) {
            return x;
        };


        var graphBuilder = {
            withClickHandler: function (clickHandler) {
                _clickHandler = clickHandler;
                return graphBuilder;
            },
            usingNoverlapLayout: function () {
                _noverlap = true;
                return graphBuilder;
            },
            withDraggableNodes: function () {
                _draggableNodes = true;
                return graphBuilder;
            },
            withPreprocessor: function (preProcessor) {
                _preProcessor = preProcessor;
                return graphBuilder;
            },

            renderWithData: function (graph) {
                setDefaultSettings();
                var graphData = _preProcessor(graph);

                var s = new sigma(
                    $.extend(graphSettings, {"graph": graphData})
                );

                var g = new sigma.classes.graph();
                g.read(graphData);
                var index = g.retrieveIndexes();

                var nodeId = '';
                s.bind('overNodes',function(event){
                    nodeId = event.data.nodes[0].id;
                    var inNodes = index.inIndex[nodeId]
                    replaceColor(s, inNodes, sigma.settings.replaceColor, nodeId);
                    s.refresh();

                }).bind('outNodes',function(){
                    var inNodes = index.inIndex[nodeId];
                    replaceColor(s, inNodes, sigma.settings.defaultNodeColor, nodeId);
                    s.refresh();
                });


                if (_clickHandler) {
                    s.bind("clickNode", _clickHandler);
                }


                if (_noverlap) {
                    var config = {
                        nodeMargin: 6,
                        // scaleNodes: 1.3,
                        duration: 2000
                    };

                    var listener = s.configNoverlap(config);
                    s.startNoverlap();
                }

                addZoomCapability(s);
                
                if (_draggableNodes) {
                    var dragListener = sigma.plugins.dragNodes(s, s.renderers[0]);
                }
            }
        };

        return graphBuilder;
    };

});