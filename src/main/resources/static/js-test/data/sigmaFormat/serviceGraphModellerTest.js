define(["data/sigmaFormat/serviceGraphModeller"], function(serviceGraphModeller) {

    describe("The Service Graph Modeller:", function () {

        var contextNames = ["context", "differentContext"];
        var microserviceNames = ["ms-1", "ms-2"];

        describe("Given a microservice with no dependencies in a particular context", function () {

            var node = {
                microService: contextNames[0] + "-" + microserviceNames[0],
                version: "1.0",
                consumedBy: []
            };

            describe("when I apply the transform function", function () {

                var result = serviceGraphModeller.extractNode(node);

                it("then I should have one node returned", function () {
                    expect(result).toBeDefined();
                });

                it("then the node should have an ID matching the service's name", function () {
                    expect(result.id).toBe(contextNames[0] + "-" + microserviceNames[0]);
                });

                it("then the node should have the correct version", function () {
                    expect(result.version).toBe("1.0")
                });

                it("then the label function should have the service's name", function () {
                    expect(result.label).toBe(contextNames[0] + "-" + microserviceNames[0]);
                });

                it("then the hover text should contain the service's name", function () {
                    expect(result.customHover).toContain(contextNames[0] + "-" + microserviceNames[0]);
                });

                it("then the hover text should contain the version", function () {
                    expect(result.customHover).toContain("1.0");
                });
            })

        });

        describe("Given a microservice with a dependency in a particular context", function () {

            var node = {
                microService: contextNames[0] + "-" + microserviceNames[0],
                version: "1.0",
                consumedBy: [{
                    microservice: contextNames[1] + "-" + microserviceNames[0]
                }]
            };

            describe("when I apply the transform function", function () {

                var result = serviceGraphModeller.extractNode(node);

                it("then I should have one node returned", function () {
                    expect(result).toBeDefined();
                });

                it("then the node should have an ID matching the service's name", function () {
                    expect(result.id).toBe(contextNames[0] + "-" + microserviceNames[0]);
                });

                it("then the node should have the correct version", function () {
                    expect(result.version).toBe("1.0")
                });

                it("then the label function should have the service's name", function () {
                    expect(result.label).toBe(contextNames[0] + "-" + microserviceNames[0]);
                });

                it("then the hover text should contain the service's name", function () {
                    expect(result.customHover).toContain(contextNames[0] + "-" + microserviceNames[0]);
                });

                it("then the hover text should contain the version", function () {
                    expect(result.customHover).toContain("1.0");
                });
            })

        });

        describe("Given two microservices from a different context", function () {
            var target  = {
                microService: contextNames[0] + "-" + microserviceNames[0],
                version: "1.0"
            };

            var source= {
                microService: contextNames[1] + "-" + microserviceNames[0],
                version: "1.0"
            };

            describe("when I extract the edge between the two", function () {
                var result = serviceGraphModeller.extractEdge(source, target)

                it("then an edge should be present", function () {
                    expect(result).toBeDefined();
                });

                it("then the edge should have an ID", function () {
                    expect(result.id).toBeDefined();
                });

                it("then the source of the edge should be the source node", function () {
                    expect(result.source).toBe(contextNames[0] + "-" + microserviceNames[0]);
                });

                it("then the target of the edge should be the target node's context", function () {
                    expect(result.target).toBe(contextNames[1] + "-" + microserviceNames[0]);
                });

            })
        })

        describe("Given two microservices from the same context", function() {
            var target= {
                microService: contextNames[0] + "-" + microserviceNames[0],
                version: "1.0"
            };

            var source = {
                microService: contextNames[0] + "-" + microserviceNames[1],
                version: "1.0"
            };

            describe("when I extract an edge from them", function() {

                var result = serviceGraphModeller.extractEdge(source, target);

                it("then an edge should be present", function () {
                    expect(result).toBeDefined();
                });

                it("then the edge should have an ID", function () {
                    expect(result.id).toBeDefined();
                });

                it("then the source of the edge should be the source node", function () {
                    expect(result.source).toBe(contextNames[0] + "-" + microserviceNames[0]);
                });

                it("then the target of the edge should be the target node's context", function () {
                    expect(result.target).toBe(contextNames[0] + "-" + microserviceNames[1]);
                });

            })
        })

        describe("Given two copies of the same microservices", function() {
            var source = {
                microService: contextNames[0] + "-" + microserviceNames[0],
                version: "1.0"
            };

            var target = {
                microService: contextNames[0] + "-" + microserviceNames[0],
                version: "1.0"
            };

            describe("when I extract an edge from them", function() {

                var result = serviceGraphModeller.extractEdge(source, target);

                it("then I expect to edge to be created", function() {
                    expect(result).toBeUndefined();
                })

            })
        })
    })


});