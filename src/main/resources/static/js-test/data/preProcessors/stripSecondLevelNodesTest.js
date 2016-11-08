define(["data/preProcessors/stripSecondLevelNodes"], function (stripSecondLevelNodes) {

    var microserviceNames = ["ms-1", "ms-2", "ms-3"];
    var contextNames = ["context0","context1","context2", "context3"];

    describe("The Strip Second Level Nodes Preprocessor", function() {

        describe("Given a single microservice that is not consumed", function() {

            var microservice =
            {
                microService: contextNames[0] + "-" + microserviceNames[0],
                consumedBy: []
            };

            describe("and is in the given context", function() {
               var preprocessor = stripSecondLevelNodes(contextNames[0]);

                describe("when I apply the preprocessor", function() {
                    var result = preprocessor(microservice);

                    it("then the name should remain the same", function () {
                        expect(result.microService).toBe(contextNames[0] + "-" + microserviceNames[0]);
                    });

                    it("then the consumedBy list should remain empty", function () {
                        expect(result.consumedBy).toEqual([]);
                    });
                });

            });

            describe("and is NOT in the given context", function() {

                var preprocessor = stripSecondLevelNodes(contextNames[1]);

                describe("when I apply the preprocessor", function() {
                    var result = preprocessor(microservice);

                    it("then the name should remain the same", function () {
                        expect(result.microService).toBe(contextNames[0] + "-" + microserviceNames[0]);
                    });

                    it("then the consumedBy list should remain empty", function () {
                        expect(result.consumedBy).toEqual([]);
                    });
                });

            });

        });

        describe("Given a single microservice that is consumed by one other microservice in a different context", function() {

            var microservice =
            {
                microService: contextNames[0] + "-" + microserviceNames[0],
                consumedBy: [
                    {
                        microService: contextNames[1] + "-" + microserviceNames[0],
                        version: "1.0"
                    }
                ]
            };

            describe("and is in the given context", function() {
               var preprocessor = stripSecondLevelNodes(contextNames[0]);

                describe("when I apply the preprocessor", function() {
                    var result = preprocessor(microservice);

                    it("then the name should remain the same", function () {
                        expect(result.microService).toBe(contextNames[0] + "-" + microserviceNames[0]);
                    });

                    it("then the consumedBy list should remain the same", function () {
                        expect(result.consumedBy).toEqual(microservice.consumedBy);
                    });
                });

            });

            describe("and is NOT in the given context and is consumed by a microservice in the given context", function() {
               var preprocessor = stripSecondLevelNodes(contextNames[1]);

                describe("when I apply the preprocessor", function() {
                    var result = preprocessor(microservice);

                    it("then the name should remain the same", function () {
                        expect(result.microService).toBe(contextNames[0]  + "-" + microserviceNames[0]);
                    });

                    it("then the consumedBy list should remain the same", function () {
                        expect(result.consumedBy).toEqual(microservice.consumedBy);
                    });
                });

            });

            describe("and is NOT in the given context and is consumed by a microservice that is NOT in the given context", function() {
               var preprocessor = stripSecondLevelNodes(contextNames[2]);

                describe("when I apply the preprocessor", function() {
                    var result = preprocessor(microservice);

                    it("then the name should remain the same", function () {
                        expect(result.microService).toBe(contextNames[0]  + "-" + microserviceNames[0]);
                    });

                    it("then the consumedBy list should be empty", function () {
                        expect(result.consumedBy).toEqual([]);
                    });
                });

            });

        })

        describe("Given a single microservice that is consumed by two microservices, each in different contexts", function() {

            var microservice =
            {
                microService: contextNames[0] + "-" + microserviceNames[0],
                consumedBy: [
                    {
                        microService: contextNames[1] + "-" + microserviceNames[0],
                        version: "1.0"
                    },
                    {
                        microService: contextNames[2] + "-" + microserviceNames[0],
                        version: "1.0"
                    }
                ]
            };

            describe("and is in the given context", function() {

                var preprocessor = stripSecondLevelNodes(contextNames[0]);

                describe("when I apply the preprocessor", function() {
                    var result = preprocessor(microservice);

                    it("then the name should remain the same", function () {
                        expect(result.microService).toBe(contextNames[0] + "-" + microserviceNames[0]);
                    });

                    it("then the consumedBy list should remain the same", function () {
                        expect(result.consumedBy).toEqual(microservice.consumedBy);
                    });
                });

            });


            describe("and it is NOT in the given context, and ONLY one of the consuming microservices is in the given context", function() {

                var preprocessor = stripSecondLevelNodes(contextNames[1]);

                describe("when I apply the preprocessor", function() {
                    var result = preprocessor(microservice);

                    it("then the name should remain the same", function () {
                        expect(result.microService).toBe(contextNames[0] + "-" + microserviceNames[0]);
                    });

                    it("then the consumedBy list should contain only one entry", function () {
                        expect(result.consumedBy.length).toEqual(1);
                    });

                    it("then the single entry in the consumedBy list is the microservice in the given context", function() {
                        expect(result.consumedBy[0].microService).toEqual(contextNames[1] + "-" + microserviceNames[0])
                    })
                });

            });


            describe("and it is NOT in the given context, and NEITHER of the consuming microservices are in the given context", function() {

                var preprocessor = stripSecondLevelNodes(contextNames[3]);

                describe("when I apply the preprocessor", function() {
                    var result = preprocessor(microservice);

                    it("then the name should remain the same", function () {
                        expect(result.microService).toBe(contextNames[0] + "-" + microserviceNames[0]);
                    });

                    it("then the consumedBy list should be empty", function () {
                        expect(result.consumedBy).toEqual([]);
                    });
                });

            });

        });
    })

});

