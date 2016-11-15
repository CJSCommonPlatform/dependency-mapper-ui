define(["lodash"], function(_) {
    return function(model) {
        var data =  $.ajax({
           dataType: "json",
           url: "/static/js/models/"+ model +"Model.json",
           async: false
        })
        .done(function(data) {
            return data[model];
        });

        return data.responseJSON[model];
    };
});