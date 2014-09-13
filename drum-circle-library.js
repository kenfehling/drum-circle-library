/**
 * Module to load in node.js
 * Author: Ken Fehling
 */

/*jshint strict: true */
/*global require, module, exports */

if (typeof define !== 'function') {
    var constants = require("./constants");
    var time_utils = require("./time_utils");
    var utils = require("./utils");
}

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            constants: constants,
            time_utils: time_utils,
            utils: utils
        };
    }
    exports.constants = constants;
    exports.time_utils = time_utils;
    exports.utils = utils;
}