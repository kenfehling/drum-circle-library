/**
 * Module to load in node.js
 * Author: Ken Fehling
 */

/*jshint strict: true */
/*global require, module */

// Let it be used on both client (browser) and server (node.js)
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['time_utils', 'utils', 'constants'], function(time_utils, utils, constants) {
    "use strict";
    return {
        time_utils: time_utils,
        utils: utils,
        constants: constants
    };
});