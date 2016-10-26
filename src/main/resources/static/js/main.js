define(["data/transform", "render/renderGraph"], function(transform, renderGraph) {

    $("#content").css("top", $(".navbar").outerHeight());

    $.ajax({
        url: "/contextGraph"
    }).done(function(data) {
        var graph = transform(data.map);
        renderGraph(graph);
    });

});