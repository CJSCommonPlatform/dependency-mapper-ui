define(["data/transform", "lodash"], function (transform, _) {

    var microserviceNames = ["ms-1", "ms-2", "ms-3"];

    var stubPredicate = function() {return true;}

    var stubGraphObjectModeller = {
        extractEdge: function(source, target) {
            return {source: source, target: target}
        },
        extractNode: function(node) {
            return {id: node.microService}
        }
    };

    describe("The Transform Function:", function () {

        describe("Given an empty list of microservices,", function () {

            var emptyMicroservices = [];

            describe("when I apply the transform function,", function () {
                var result = transform(emptyMicroservices, stubGraphObjectModeller);

                it("then I expect to see an empty graph", function () {
                    expect(result.nodes).toEqual([]);
                    expect(result.edges).toEqual([]);
                })
            })
        });

        describe("Given a single microservice,", function () {

            var microservice = [{
                microService: microserviceNames[0],
                version: "1.0"
            }];

            describe("when I apply the transform function", function () {
                var result = transform(microservice, stubPredicate, stubGraphObjectModeller);

                it("then I expect to see a single node created", function () {
                    expect(result.nodes.length).toBe(1);
                });

                it("then I expect to see the properties of that microservice displayed on the node", function () {
                    expect(result.nodes[0].id).toEqual(microserviceNames[0]);
                });

                it("then I expect to see no edges on the graph", function () {
                    expect(result.edges).toEqual([]);
                })

            })


        });

        describe("Given a microservices that is consumed, without the consumer listed", function () {

            var microservice = [{
                microService: microserviceNames[0],
                version: "1.0",
                consumedBy: [
                    {
                        microService: microserviceNames[1],
                        usingVersion: "1.0"
                    }
                ]
            }];

            describe("when I apply the transform function,", function () {

                var result = transform(microservice, stubPredicate, stubGraphObjectModeller);

                it("then I expect to see two nodes created", function () {
                    expect(result.nodes.length).toBe(2);
                });

                it("then the nodes should have the microservice names", function () {
                    var microserviceNames = _.map(result.nodes, "id");

                    expect(microserviceNames).toContain(microserviceNames[0]);
                    expect(microserviceNames).toContain(microserviceNames[1]);
                });

                it("then there should be one relationship between nodes", function () {
                    expect(result.edges.length).toBe(1);
                });

                it("then the relationship should be between the two microservices", function () {
                    expect(result.edges[0].source.microService).toBe(microserviceNames[0]);
                    expect(result.edges[0].target.microService).toBe(microserviceNames[1]);
                })

            });
        });

        describe("Given a complete list of microservices", function () {

            var microservice = [{
                microService: microserviceNames[0],
                version: "1.0",
                consumedBy: [
                    {
                        microService: microserviceNames[1],
                        usingVersion: "1.0"
                    }
                ],
            }, {
                microService: microserviceNames[1],
                version: "2.0"
            }];

            describe("when I apply the transform function", function() {
                var result = transform(microservice, stubPredicate, stubGraphObjectModeller);

                it("then I expect to see two nodes created", function () {
                    expect(result.nodes.length).toBe(2);
                });

                it("then the nodes should have the microservice names", function () {
                    var microserviceNames = _.map(result.nodes, "id");

                    expect(microserviceNames).toContain(microserviceNames[0]);
                    expect(microserviceNames).toContain(microserviceNames[1]);
                });

                it("then there should be one relationship between nodes", function () {
                    expect(result.edges.length).toBe(1);
                });

                it("then the relationship should be between the two microservices", function () {
                    expect(result.edges[0].source.microService).toBe(microserviceNames[0]);
                    expect(result.edges[0].target.microService).toBe(microserviceNames[1]);
                });
            });

            describe("when I apply the transform function with a predicate present", function() {
                var result = transform(microservice, function(node) {
                    return node.microService === microserviceNames[0];
                }, stubGraphObjectModeller);

                it("then I expect to see two nodes created", function () {
                    expect(result.nodes.length).toBe(2);
                });

                it("then the nodes should have the microservice names", function () {
                    var microserviceNames = _.map(result.nodes, "id");

                    expect(microserviceNames).toContain(microserviceNames[0]);
                    expect(microserviceNames).toContain(microserviceNames[1]);
                });

                it("then there should be one relationship between nodes", function () {
                    expect(result.edges.length).toBe(1);
                });

                it("then the relationship should be between the two microservices", function () {
                    expect(result.edges[0].source.microService).toBe(microserviceNames[0]);
                    expect(result.edges[0].target.microService).toBe(microserviceNames[1]);
                })
            })
        });

        describe("Given a list of many microservices", function () {

            var microservice = [{
                microService: microserviceNames[0],
                version: "1.0",
                consumedBy: [
                    {
                        microService: microserviceNames[1],
                        usingVersion: "1.0"
                    }
                ],
            }, {
                microService: microserviceNames[2],
                version: "2.0"
            }];

            describe("when I apply the transform function with a predicate present", function() {
                var result = transform(microservice, function(node) {
                    return node.microService === microserviceNames[0];
                }, stubGraphObjectModeller);

                it("then I expect to see two nodes created", function () {
                    expect(result.nodes.length).toBe(2);
                });

                it("then the nodes should have the microservice names", function () {
                    var microserviceNames = _.map(result.nodes, "id");

                    expect(microserviceNames).toContain(microserviceNames[0]);
                    expect(microserviceNames).toContain(microserviceNames[1]);
                });

                it("then there should be one relationship between nodes", function () {
                    expect(result.edges.length).toBe(1);
                });

                it("then the relationship should be between the two microservices", function () {
                    expect(result.edges[0].source.microService).toBe(microserviceNames[0]);
                    expect(result.edges[0].target.microService).toBe(microserviceNames[1]);
                })
            })

        });
    });
});
