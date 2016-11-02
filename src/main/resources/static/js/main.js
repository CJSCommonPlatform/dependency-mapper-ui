define(["data/transform", "data/sigmaFormat/contextGraphModeller", "data/predicates/oneLevelNamedNodePredicate", "render/renderGraph"], function(transform, graphObjectMapper, oneLevelNamedNodePredicate, renderGraph) {

    $.ajax({
        url: "/contextGraph"
    }).done(function(data) {

        if(getQueryVariable("nodeName")) {
            var predicate = oneLevelNamedNodePredicate(getQueryVariable("nodeName"));
        } else {
            var predicate = function() {return true;}
        }

        var graph = transform(data.microServices, predicate, graphObjectMapper);
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