define([], function() {
    return {
        requestVersion: function(callback, err) {
            $.ajax({
                url: "/version"
            }).done(function(data) {
                callback(data.version);
            });
        }
    };
});