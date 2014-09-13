/**
 * Author: Ken Fehling
 */

/*jshint strict: true */
/*global require, module, exports */

// Let it be used on both client (browser) and server (node.js)
// The client doesn't have 'require' but the server... requries it.
if (typeof require !== 'undefined') {
    var constants = require("./constants");
    var time_utils = require("./time_utils");
    var utils = require("./utils");
}

// Let it be used on both client (browser) and server (node.js)
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