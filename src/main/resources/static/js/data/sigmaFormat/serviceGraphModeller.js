define([], function() {

    var extractNode = function(context) {
        return {
            id: context.microService,
            label: context.microService,
            version: context.version ? context.version : undefined,
            customHover: context.microService + (context.version ? " (v" + context.version + ")" : "")
        }
    };

    var extractEdge = function(context, consumer) {
        var isCurrentVersion = context.version === consumer.usingVersion;

        if(context.microService === consumer.microService) {
            return;
        }

        var edgeLabel = "consumes";
        if(consumer.usingVersion && !consumer.usingVersion.startsWith("$") ){
            edgeLabel += " using v" + consumer.usingVersion;
        }

        return {
            id: "e" + Math.random(),
            label: edgeLabel,
            target: context.microService,
            source: consumer.microService,
            color: isCurrentVersion ?  "#9cf" : "#f00"
        }
    };

    return {
        extractNode: extractNode,
        extractEdge: extractEdge
    };
});