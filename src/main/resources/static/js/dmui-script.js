(function(){
    var myFlower = new CodeFlower("#content", 800, 800);

    $.getJSON("http://localhost:9999/contextGraph", function (data) {
        myFlower.update(data);
    });


})(jQuery);