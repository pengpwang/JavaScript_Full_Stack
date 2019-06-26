(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.umd_res = factory());
}(this, function () { 'use strict';

  var version = "1.0.0";

  function main () {
    console.log(`version: ${version}`);
  }

  return main;

}));
