define(["data/transform", "lodash"], function (transform, _) {
    var microserviceNames = ["ms-1", "ms-2"];

    describe("", function () {

        describe("Given an empty list of microservices,", function () {

            var emptyMicroservices = [];

            describe("when I apply the transform function,", function () {
                var result = transform(emptyMicroservices);

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
                var result = transform(microservice);

                it("then I expect to see a single node created", function () {
                    expect(result.nodes.length).toBe(1);
                });

                it("then I expect to see the properties of that microservice displayed on the node", function () {
                    expect(result.nodes[0].id).toEqual(microserviceNames[0]);
                    expect(result.nodes[0].version).toEqual("1.0");
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
                dependencies: [
                    {
                        microService: microserviceNames[1],
                        version: "1.0"
                    }
                ]
            }];

            describe("when I apply the transform function,", function () {

                var result = transform(microservice);

                it("then I expect to see two nodes created", function () {
                    expect(result.nodes.length).toBe(2);
                });

                it("then the nodes should have the microservice names", function () {
                    var microserviceNames = _.map(result.nodes, "id");

                    expect(microserviceNames).toContain(microserviceNames[0]);
                    expect(microserviceNames).toContain(microserviceNames[1]);
                });

                it("then the top level microservice should have its version defined", function () {
                    var microservice1 = _.find(result.nodes, ["id", microserviceNames[0]]);

                    expect(microservice1.version).toBe("1.0");
                });

                it("then the consuming microservice should have no version defined", function () {
                    var microservice1 = _.find(result.nodes, ["id", microserviceNames[1]]);

                    expect(microservice1.version).toBeUndefined();
                });

                it("then there should be one relationship between nodes", function () {
                    expect(result.edges.length).toBe(1);
                });

                it("then the relationship should have its label defined", function() {
                    expect(result.edges[0].label).toContain("1.0");
                });

                it("then the relationship should be between the two microservices", function () {
                    expect(result.edges[0].source).toBe(microserviceNames[0]);
                    expect(result.edges[0].target).toBe(microserviceNames[1]);
                })

            });
        });

        describe("Given a complete list of microservices", function () {

            var microservice = [{
                microService: microserviceNames[0],
                version: "1.0",
                dependencies: [
                    {
                        microService: microserviceNames[1],
                        version: "1.0"
                    }
                ],
            }, {
                microService: microserviceNames[1],
                version: "2.0"
            }];

            describe("when I apply the transform function", function() {
                var result = transform(microservice);

                it("then I expect to see two nodes created", function () {
                    expect(result.nodes.length).toBe(2);
                });

                it("then the nodes should have the microservice names", function () {
                    var microserviceNames = _.map(result.nodes, "id");

                    expect(microserviceNames).toContain(microserviceNames[0]);
                    expect(microserviceNames).toContain(microserviceNames[1]);
                });

                it("then the top level microservice should have its version defined", function () {
                    var microservice1 = _.find(result.nodes, ["id", microserviceNames[0]]);

                    expect(microservice1.version).toBe("1.0");
                });

                it("then the consuming microservice should have version equal to its top level version (and not the dependent version)", function() {
                    var microservice2 = _.find(result.nodes, ["id", microserviceNames[1]]);

                    expect(microservice2.version).toBe("2.0");
                });


                it("then there should be one relationship between nodes", function () {
                    expect(result.edges.length).toBe(1);
                });

                it("then the relationship should have its label defined", function() {
                    expect(result.edges[0].label).toContain("1.0");
                });

                it("then the relationship should be between the two microservices", function () {
                    expect(result.edges[0].source).toBe(microserviceNames[0]);
                    expect(result.edges[0].target).toBe(microserviceNames[1]);
                })
            })
        });

        describe("Given a microservice dependency that is outdated", function() {
            var microservice = [{
                microService: microserviceNames[0],
                version: "1.0",
                dependencies: [
                    {
                        microService: microserviceNames[1],
                        version: "0.9"
                    }
                ],
            }];

            describe("when I apply the transform function", function() {
                var result = transform(microservice);

                it("then I expect to see two nodes created", function () {
                    expect(result.nodes.length).toBe(2);
                });

                it("then there should be one relationship between nodes", function () {
                    expect(result.edges.length).toBe(1);
                });

                it("then the relationship should be between the two microservices", function () {
                    expect(result.edges[0].source).toBe(microserviceNames[0]);
                    expect(result.edges[0].target).toBe(microserviceNames[1]);
                })

                it("then the relationship should have its label defined", function () {
                    expect(result.edges[0].label).toContain("0.9");
                });

                it("then the relationship should have 'OUTDATED' printed on the edge and be red", function () {
                    expect(result.edges[0].label).toContain("OUTDATED");
                    expect(result.edges[0].color).toBe("#f00");
                });
            });
        })
    });
});
