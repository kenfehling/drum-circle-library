/**
 * Module to load in node.js
 * Author: Ken Fehling
 */

/*jshint strict: true */
/*global require, module, exports */



if (typeof require !== 'undefined') {
    var constants = require("./constants");
    var time_utils = require("./time_utils");
    var utils = require("./utils");
}

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            constants: constants
        };
    }
    exports.constants = constants;
    exports.time_utils = time_utils;
    exports.utils = utils;
}