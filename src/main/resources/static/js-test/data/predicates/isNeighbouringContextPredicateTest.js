define(["data/predicates/isNeighbouringContextPredicate"], function(predicate) {

    var contextNames = ["context", "differentContext"];
    var microserviceNames = ["ms-1", "ms-2"];

    describe("The IsNeighbouringContextPredicate: ", function() {

        describe("Given a microservice with no neighbours", function() {
            var microservice = {
                microService: contextNames[0] + "-" + microserviceNames[0],
                version: "1.0",
                consumedBy: []
            };

            describe("when I call the predicate asking for its context", function() {
                var predicateFunction = predicate(contextNames[0]);
                var result = predicateFunction(microservice);

                it("then I expect to return true", function() {
                    expect(result).toBeTruthy();
                })
            });

            describe("when I call the predicate asking for a different context", function() {
                var predicateFunction = predicate(contextNames[1]);
                var result = predicateFunction(microservice);

                it("then I expect it to return false", function() {
                    expect(result).toBeFalsy();
                })
            })
        });

        describe("Given a microservice with a neighbour from a different context", function() {
            var microservice = {
                microService: contextNames[0] + "-" + microserviceNames[0],
                version: "1.0",
                consumedBy: [
                    {microService: contextNames[1] + "-" + microserviceNames[1], usingVersion: "1.0"}
                ]
            };

            describe("when I call the predicate asking for its neighbouring context", function() {
                var predicateFunction = predicate(contextNames[1]);
                var result = predicateFunction(microservice);

                it("then I expect it to return true", function() {
                    expect(result).toBeTruthy();
                });
            });

            describe("when I call the predicate asking for its context", function() {
                var predicateFunction = predicate(contextNames[0]);
                var result = predicateFunction(microservice);

                it("then I expect it to return true", function() {
                    expect(result).toBeTruthy();
                });
            });

            describe("when I call the predicate asking for a totally different context", function() {
                var predicateFunction = predicate(contextNames[2]);
                var result = predicateFunction(microservice);

                it("then I expect it to return false", function() {
                    expect(result).toBeFalsy();
                })
            })
        })

    })

});