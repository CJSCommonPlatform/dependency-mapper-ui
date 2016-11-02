define(["data/transform", "render/renderGraph"], function(transform, renderGraph) {

    $.ajax({
        url: "/contextGraph"
    }).done(function(data) {
        var contextName = getQueryVariable("nodeName");
        var predicate = contextName ? function(node) { return node.microService === contextName; } : function() {return true;};

        var graph = transform(data.microServices, predicate);
        renderGraph(graph);
    });

});

function getQueryVariable(variable)  {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}