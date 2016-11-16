define([], function() {

    var extractNode = function(service) {
        return {
            id: service.microService,
            label: service.microService,
            version: service.version ? service.version : undefined,
            ramlDocument: service.ramlDocument === "NA" ? undefined : service.ramlDocument,
            customHover: service.microService + (service.version ? " (v" + service.version + ")" : "")
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
            color: isCurrentVersion ?  "#9cf" : "#ff0000"
        }
    };

    return {
        extractNode: extractNode,
        extractEdge: extractEdge
    };
});