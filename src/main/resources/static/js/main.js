define(["gateway/contextGraphGateway",
        "data/transform",
        "data/sigmaFormat/contextGraphModeller",
        "render/graphBuilder",
        "render/bindings/renderServiceGraphEvent"],

    function(gateway, transform, graphObjectMapper, graphBuilder, renderServiceGraphEvent) {

    var renderContextGraph = function(data) {
        var formattedContextList = transform(
            data.microServices,
            function() {return true;},
            graphObjectMapper, _.identity);

        $("#content").empty();
        $("h1").text("Dependency graph");
        $("#breadcrumbs").css("display", "none");

        graphBuilder()
            .withDraggableNodes()
            .usingNoverlapLayout()
            .withPreprocessor(enrichGraphData)
            .withClickHandler(renderServiceGraphEvent)
            .renderWithData(formattedContextList);

        $("#breadcrumbs").off("click");

        $("#breadcrumbs").click(function() {
            $("[data-custom-event='shrinkable']").removeClass("col-md-6").addClass("col-md-12");
            renderContextGraph(data);
            $("#ramlDetails").empty();
        });
    };

    $('.page-header pre code, .top-resource-description pre code, .modal-body pre code').each(function (i, block) {
        hljs.highlightBlock(block);
    });

    $('[data-toggle]').click(function () {
        var selector = $(this).data('target') + ' pre code';
        $(selector).each(function (i, block) {
            hljs.highlightBlock(block);
        });
    });

    // open modal on hashes like #_action_get
    $(window).bind('hashchange', function (e) {
        var anchor_id = document.location.hash.substr(1); //strip #
        var element = $('#' + anchor_id);

        // do we have such element + is it a modal?  --> show it
        if (element.length && element.hasClass('modal')) {
            element.modal('show');
        }
    });

    // execute hashchange on first page load
    $(window).trigger('hashchange');

    // remove url fragment on modal hide
    $('.modal').on('hidden.bs.modal', function () {
        try {
            if (history && history.replaceState) {
                history.replaceState({}, '', '#');
            }
        } catch (e) {
        }
    });


    gateway.requestData(renderContextGraph)

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
});


