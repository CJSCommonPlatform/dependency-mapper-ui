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
    sigma.settings.replaceColor = '#000';
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
function updateColor(s, obj, target, replace) {
    for (var i in obj) {
        s.graph.nodes().forEach(function (n) {
            if (i === n.id){
                if(replace){
                    if(typeof n.color !== "undefined" && n.color !== sigma.settings.replaceColor){
                        n.defaultColor = n.color;
                    }
                    n.color = sigma.settings.replaceColor;
                } else {
                    // if defaultColor is not defined will fallback to global default color
                    n.color = n.defaultColor;
                }

                s.graph.edges().forEach(function (e) {
                    if (n.id === e.source && target === e.target){
                        if(replace){
                            if(typeof e.color !== "undefined" && e.color !== sigma.settings.replaceColor){
                                e.defaultColor = e.color;
                            }
                            e.color = sigma.settings.replaceColor;
                        } else {
                            e.color = e.defaultColor;
                        }
                    }

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
                    updateColor(s, inNodes, nodeId, true);
                    s.refresh();
                }).bind('outNodes',function(){
                    var inNodes = index.inIndex[nodeId];
                    updateColor(s, inNodes,nodeId, false);
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