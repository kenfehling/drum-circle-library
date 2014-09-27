/**
 * Utils for Mocha and Chai
 * Author: Ken Fehling
 */

/*jshint strict: true */
/*global require, module */

// Let it be used on both client (browser) and server (node.js)
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['chai'], function(chai) {
    "use strict";

    var expect = chai.expect;

    return {
        exists: function (value) {
            expect(value).to.not.be.undefined;
            expect(value).to.not.equal("undefined");
        }
    };
});