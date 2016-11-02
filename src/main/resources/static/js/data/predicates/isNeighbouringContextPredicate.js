define(["lodash"], function(_) {

    return function(context) {
        return function(microservice) {
            return microservice.microService.split("-")[0] === context ||
                _.some(microservice.consumedBy, function(node) {return node.microService.split("-")[0] === context});
        }
    }
});