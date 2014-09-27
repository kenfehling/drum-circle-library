/**
 * Utils for Mocha and Chai
 * Author: Ken Fehling
 */

/*jshint strict: true */
/*global require, module */

var expect = require('chai').expect;

module.exports = {
    exists: function(value) {
        "use strict";
        expect(value).to.not.be.undefined;
        expect(value).to.not.equal("undefined");
    }
}