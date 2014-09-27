/**
 * Utils unit tests
 * Author: Ken Fehling
 */

/*jshint strict: true */
/*global require, module, exports */

var utils = require('../utils');

exports.testGetHashParams = function(test) {
    "use strict";
    var params = utils.getHashParams('http://example.com/#a=12&b=24');
    test.deepEqual({ a: 12, b: 24 }, params);
    test.done();
};