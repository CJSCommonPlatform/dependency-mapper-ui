
$.ajax({
    url: "/contextGraph"
}).done(function(data) {
    $('#content').append(data.map[0].microService);
});