define([], function() {
    var extractNode = function(context) {
        return {
            id: context.microService.split("-")[0],
            label: context.microService.split("-")[0],
            version: context.version ? context.version : undefined,
            customHover: context.microService.split("-")[0] + (context.version ? " (v" + context.version + ")" : "")
        }
    };

    var extractEdge = function(context, consumer) {
        var isCurrentVersion = context.version === consumer.usingVersion;

        if(context.microService.split("-")[0] === consumer.microService.split("-")[0]) {
            return;
        }

        return {
            id: "e" + Math.random(),
            label: "is consumed using v" + consumer.usingVersion + " from",
            source: context.microService.split("-")[0],
            target: consumer.microService.split("-")[0],
            color: isCurrentVersion ?  "#9cf" : "#f00"
        }
    };

    return {
        extractNode: extractNode,
        extractEdge: extractEdge
    };
});