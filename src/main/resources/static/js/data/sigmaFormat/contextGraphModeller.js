define([], function() {
    var extractNode = function(context) {
        return {
            id: context.microService.split("-")[0],
            label: context.microService.split("-")[0],
            version: context.version ? context.version : undefined,
            customHover: (context.microService.split("-")[0] + (context.version ? " (v" + context.version + ")" : "")) +
                         ", Service Pom "  + (context.servicePomVersion ? "(v" + context.servicePomVersion + ")" : "unknown")
        }
    };

    var extractEdge = function(context, consumer) {
        if(context.microService.split("-")[0] === consumer.microService.split("-")[0]) {
            return;
        }

        return {
            id: "e" + Math.random(),
            target: context.microService.split("-")[0],
            source: consumer.microService.split("-")[0],
            color: "#9cf"
        }
    };

    return {
        "extractNode": extractNode,
        "extractEdge": extractEdge
    };
});