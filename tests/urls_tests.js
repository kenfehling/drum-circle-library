/**
 * Urls unit tests
 * Author: Ken Fehling
 */

/*jshint strict: true */
/*global require, module, exports */

var urls = require('../urls');

exports.testGetGameCodeFromUrl = function(test) {
    "use strict";
    var code = urls.getGameCodeFromUrl('http://example.com/game.html?100#color=red');
    test.equals(100, code);
    test.done();
};