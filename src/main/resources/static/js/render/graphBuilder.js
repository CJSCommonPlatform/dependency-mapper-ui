var setDefaultSettings = function() {
    sigma.settings.minArrowSize = 8;
    sigma.settings.autoRescale = true;
    sigma.settings.defaultNodeColor = "#9cf";
    sigma.settings.labelThreshold = 1;
    sigma.settings.minNodeSize = 24;
    sigma.settings.minEdgeSize = 4;
    sigma.settings.sideMargin = 24;
    sigma.settings.mouseWheelEnabled = false;
    sigma.settings.defaultEdgeType = "curvedArrow";
};

var graphSettings = {
    renderers: [
        {
            container: document.getElementById('content'),
            type: 'canvas'
        }
    ]
};

define([], function() {

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

                s = new sigma(
                    $.extend(graphSettings, {graph: graphData})
                );

                if (_clickHandler) {
                    s.bind("clickNode", _clickHandler);
                }

                if (_noverlap) {
                    var config = {
                        nodeMargin: 12,
                        scaleNodes: 1.3,
                        duration: 2000
                    };

                    var listener = s.configNoverlap(config);
                    s.startNoverlap();
                }

                if (_draggableNodes) {
                    var dragListener = sigma.plugins.dragNodes(s, s.renderers[0]);
                }
            }
        };

        return graphBuilder;
    };

});