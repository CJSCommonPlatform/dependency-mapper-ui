define([], function() {
    return function(sigmaInstance) {
        var c = sigmaInstance.camera;
        $("#zoomOut").click(function(e) {
            sigma.misc.animation.camera(c, {
                ratio: c.ratio * c.settings('zoomingRatio')
            }, {
                duration: 200
            });
            e.preventDefault();
        });
        $("#zoomIn").click(function(e) {
            sigma.misc.animation.camera(c, {
                ratio: c.ratio / c.settings('zoomingRatio')
            }, {
                duration: 200
            });
            e.preventDefault();
        });
    };
});