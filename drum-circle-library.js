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

define(['constants', 'time_utils', 'utils'], function(constants, time_utils, utils) {
    "use strict";
    return {
        constants: constants,
        time_utils: time_utils,
        utils: utils
    };
});