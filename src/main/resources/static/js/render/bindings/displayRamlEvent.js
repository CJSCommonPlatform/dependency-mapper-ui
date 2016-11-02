define([], function() {
    return function(e){
        var microserviceName = e.data.node.label;

        $("#ramlDetails").load("/ramlReport?ramlFileName=" + microserviceName + ".html .row");
    }
})