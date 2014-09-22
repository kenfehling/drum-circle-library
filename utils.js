/**
 * A collection of useful functions
 */

/*jshint strict: true */
/*global require, module */

// Let it be used on both client (browser) and server (node.js)
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['lodash'], function(_) {
    "use strict";

    function greatestCommonDivisor(a, b) {
        if (!b) {
            return a;
        }
        return greatestCommonDivisor(b, a % b);
    }

    function clone(item) {
        if (!item) { return item; } // null, undefined values check

        var types = [ Number, String, Boolean ],
            result;

        // normalizing primitives if someone did new String('aaa'), or new Number('444');
        types.forEach(function(type) {
            if (item instanceof type) {
                result = type( item );
            }
        });

        if (typeof result === "undefined") {
            if (Object.prototype.toString.call( item ) === "[object Array]") {
                result = [];
                item.forEach(function(child, index, array) {
                    result[index] = clone( child );
                });
            } else if (typeof item === "object") {
                // testing that this is DOM
                if (item.nodeType && typeof item.cloneNode === "function") {
                    result = item.cloneNode( true );
                } else if (!item.prototype) { // check that this is a literal
                    if (item instanceof Date) {
                        result = new Date(item);
                    } else {
                        // it is an object literal
                        result = {};
                        _.each(item, function(value, key) {
                            result[key] = clone(value);
                        });
                    }
                } else {
                    // depending what you would like here,
                    // just keep the reference, or create new object
                    if (false && item.constructor) {
                        // would not advice to do that, reason? Read below
                        result = new item.constructor();
                    } else {
                        result = item;
                    }
                }
            } else {
                result = item;
            }
        }

        return result;
    }

    function removeItemFromArray(array, obj) {
        if (array.length === 0) {
            return;
        }
        var index = array.indexOf(obj);
        if (index > -1) {  // If item was found
            if (_.isEqual(array[index], obj)) {  // Make sure it's equal
                array.splice(index, 1);
            }
            else {
                // Call recursively with rest of array
                removeItemFromArray(array.slice(index), obj);
            }
        }
    }

    return {
        randomString: function(len, charSet) {
            charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var randomString = '';
            for (var i = 0; i < len; i++) {
                var randomPoz = Math.floor(Math.random() * charSet.length);
                randomString += charSet.substring(randomPoz,randomPoz + 1);
            }
            return randomString;
        },

        isParamTruthy: function(p) {
            return p === true || p === 1 || p === '1' || p === 'true';
        },

        removeItemFromArrayWhere: function(array, properties) {
            removeItemFromArray(array, _.findWhere(array, properties));
        },

        scaleValue: function (options) {
            var inputValue = options.inputValue;
            var inputRange = options.inputRange;
            var outputRange = options.outputRange;
            var minInput = inputRange[0];
            var maxInput = inputRange[1];
            var minOutput = outputRange[0];
            var maxOutput = outputRange[1];
            var scaleFactor = (maxOutput - minOutput) / (maxInput - minInput);
            return (inputValue - minInput) * scaleFactor + minOutput;
        },

        // Get the average of an array of numbers
        average: function (array) {
            return _.reduce(array, function(memo, num) {
                return memo + num;
            }, 0) / array.length;
        },

        // Get the key associated with the highest value in the array
        getMaxKey: function(object) {
            var max, i;
            for (i in object) {
                if (object.hasOwnProperty(i)) {
                    if (!max) {
                        max = i;
                    } else if (i > max) {
                        max = i;
                    }
                }
            }
            return max;
        },

        // Get the key associated with the lowest value in the array
        getMinKey: function(object) {
            var min, i;
            for (i in object) {
                if (object.hasOwnProperty(i)) {
                    if (!min) {
                        min = i;
                    } else if (i < min) {
                        min = i;
                    }
                }
            }
            return min;
        },
        removeItemFromArray: removeItemFromArray,
        greatestCommonDivisor: greatestCommonDivisor,
        clone: clone
    };
});