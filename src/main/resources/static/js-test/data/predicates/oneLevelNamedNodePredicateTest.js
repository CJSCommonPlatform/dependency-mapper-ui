define(["data/predicates/oneLevelNamedNodePredicate"], function (predicate) {

    var microserviceNames = ["ms-1", "ms-2", "ms-3"];

    describe("The OneLevelNamedNode Predicate", function() {

        describe("Given a single microservice that is not consumed", function() {

            var microservice =
                {
                    microService: microserviceNames[0],
                    consumedBy: {}
                };

            it("that matches the name of the microservice, then it should return true", function() {
                var predicateFunction = predicate(microserviceNames[0]);
                var result = predicateFunction(microservice);

                expect(result).toBeTruthy();
            });

            it("that does not match any name on the microservice, then it should return false", function() {
                var predicateFunction = predicate(microserviceNames[1]);
                var result = predicateFunction(microservice);

                expect(result).toBeFalsy();
            })

        })

        describe("Given a single microservice", function() {

            var microservice =
            {
                microService: microserviceNames[0],
                consumedBy: [{
                    microService: microserviceNames[1]
                }]

            };


            describe("when I apply the predicate to it with a name", function() {

                it("that matches the name of the microservice, then it should return true", function() {
                    var predicateFunction = predicate(microserviceNames[0]);
                    var result = predicateFunction(microservice);
                    expect(result).toBeTruthy();
                });

                it("that matches the name of a microservice consumed by the microservice, then it should return true", function() {
                    var predicateFunction = predicate(microserviceNames[1]);
                    var result = predicateFunction(microservice);
                    expect(result).toBeTruthy();
                });

                it("that does not match any name on the microservice, then it should return false", function() {
                    var predicateFunction = predicate(microserviceNames[2]);
                    var result = predicateFunction(microservice);
                    expect(result).toBeFalsy();
                });
            });

        })
    })

});
