System.register([], function (exports) {
  'use strict';
  return {
    execute: function () {

      exports('default', main);

      var version = "1.0.0";

      function main () {
        console.log(`version: ${version}`);
      }

    }
  };
});
