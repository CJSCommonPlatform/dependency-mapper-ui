define(["data/sigmaFormat/contextGraphModeller"], function(contextGraphModeller) {

   describe("The Context Graph Modeller:", function() {

       describe("Given a microservice with no dependencies in a particular context", function() {

           var contextName = "context";
           var microserviceName = "ms-1";

           var node = {
               microService: contextName + "-" + microserviceName,
               version: "1.0",
               consumedBy: []
           };

           describe("when I apply the transform function", function() {

               var result = contextGraphModeller.extractNode(node);

               it("then I should have one node returned", function() {
                   expect(result).toBeDefined();
               });

               it("then the node should have an ID matching its context", function() {
                   expect(result.id).toBe(contextName);
               });

               it("then the node should have the correct version", function() {
                   expect(result.version).toBe("1.0")
               });

               it("then the label function should have the correct context name", function() {
                   expect(result.label).toBe(contextName);
               });

               it("then the hover text should contain the context name", function() {
                   expect(result.customHover).toContain(contextName);
               });

               it("then the hover text should contain the version", function() {
                   expect(result.customHover).toContain("1.0");
               });
           })

       });

       describe("Given a microservice with a dependency in a particular context", function() {

           var contextName = "context";
           var microserviceName = "ms-1";

           var node = {
               microService: contextName + "-" + microserviceName,
               version: "1.0",
               consumedBy: [{
                   microservice: "differentContext-foo-bar"
               }]
           };

           describe("when I apply the transform function", function() {

               var result = contextGraphModeller.extractNode(node);

               it("then I should have one node returned", function() {
                   expect(result).toBeDefined();
               });

               it("then the node should have an ID matching its context", function() {
                   expect(result.id).toBe(contextName);
               });

               it("then the node should have the correct version", function() {
                   expect(result.version).toBe("1.0")
               });

               it("then the label function should have the correct context name", function() {
                   expect(result.label).toBe(contextName);
               });

               it("then the hover text should contain the context name", function() {
                   expect(result.customHover).toContain(contextName);
               });

               it("then the hover text should contain the version", function() {
                   expect(result.customHover).toContain("1.0");
               });
           })

       })

   })

});