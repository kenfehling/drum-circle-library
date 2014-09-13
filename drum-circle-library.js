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

define(['constants', 'utils', 'time_utils'], function(constants, utils, time_utils) {
    "use strict";
    return {
        constants: constants,
        utils: utils,
        time_utils: time_utils
    };
});