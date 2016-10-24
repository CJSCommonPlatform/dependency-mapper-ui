
$.ajax({
    url: "/contextGraph"
}).done(function(data) {
    $('#content').append(data.contexts[0].name);
});