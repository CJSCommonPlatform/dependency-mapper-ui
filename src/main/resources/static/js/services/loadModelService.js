define(["lodash"], function(_) {
    return function(model) {
        $.getJSON( "/static/js/models/"+ model +"Model.json", function( data ) {
        })
        .done(function(data) {
            return data.coreServices;
        });
    };
});