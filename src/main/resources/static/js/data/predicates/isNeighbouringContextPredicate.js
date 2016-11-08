define(["lodash"], function(_) {

    var isMicroserviceInContext = function(microserviceName, contextName) {
        return microserviceName.split("-")[0] === contextName;
    };

    return function(context) {
        return function(microservice) {
            return isMicroserviceInContext(microservice.microService, context) ||
                _.some(microservice.consumedBy, function(node) {return isMicroserviceInContext(node.microService, context)});
        }
    }

});