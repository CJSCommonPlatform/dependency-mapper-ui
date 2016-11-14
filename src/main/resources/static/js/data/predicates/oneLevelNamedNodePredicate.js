define(["lodash"], function (_) {
  return function (nodeName) {

    return function (node) {
      return node.microService === nodeName
        || _.some(node.consumedBy, function (node) {
          return node.microService === nodeName
        });
    }

  }
});