define([], function() {
    return {
        requestData: function(callback, err) {
            $.ajax({
                url: "/contextGraph"
            }).done(function(data) {
                callback(data);
            });
        }
    }
});