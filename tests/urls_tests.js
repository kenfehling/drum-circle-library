/**
 * Urls unit tests in nodeunit
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

exports.testIsOnGamePage = function(test) {
    "use strict";
    test.equals(true, urls.isOnGamePage('http://example.com/game.html?291#color=red'));
    test.equals(true, urls.isOnGamePage('http://example.com/game.html'));
    test.equals(false, urls.isOnGamePage('http://example.com'));
    test.equals(false, urls.isOnGamePage('http://example.com/'));
    test.equals(false, urls.isOnGamePage('http://example.com:8080'));
    test.equals(false, urls.isOnGamePage('http://example.com:8080/'));
    test.done();
};