define(["lodash"], function(_) {

    var isMicroserviceInContext = function(microservice, contextName) {
        return microservice.microService.split("-")[0] === contextName;
    };

    return function(contextName){
        return function(microservice) {
            if(isMicroserviceInContext(microservice, contextName)) {
                return microservice;
            } else {
                return {
                    microService: microservice.microService,
                    consumedBy: _.filter(microservice.consumedBy, function(consumingMicroservice) {
                        return isMicroserviceInContext(consumingMicroservice, contextName);
                    })
                };
            }
        }
    }

});