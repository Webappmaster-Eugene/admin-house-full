'use strict';
// This "shim" can be used on the frontend to prevent from errors on undefined
// decorators in the models, when you are sharing same models across backend
// and frontend.
// To use this shim simply configure your bundler configuration to use this file
// instead of the `automapper/classes` module.
exports.__esModule = true;
exports.AutoMap = void 0;
/* eslint-disable @typescript-eslint/no-empty-function */
function AutoMap() {
  return function () {};
}
exports.AutoMap = AutoMap;