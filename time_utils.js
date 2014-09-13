/**
 * Time utility functions
 * Author: Ken Fehling
 */

/*jshint strict: true */
/*global require, module, exports, define */

// Let it be used on both client (browser) and server (node.js)
if (typeof define !== 'function') {
    var _ = require("lodash");
    var utils = require("./utils");
}

var time_utils = (function(_, utils) {
    "use strict";

    // timeDifference is negative when client is behind, positive when ahead
    function calculateNextIntervalTime(options) {
        var clientTime = options.clientTime;
        var intervalDuration = options.intervalDuration;
        var timeDifference = options.timeDifference;
        var serverTime = clientTime - timeDifference;
        var lastServerInterval = serverTime - serverTime % intervalDuration;
        var nextServerInterval = lastServerInterval + intervalDuration;
        var nextClientInterval = nextServerInterval + timeDifference;
        if (nextClientInterval <= clientTime) {      // If in the past
            nextClientInterval += intervalDuration;  // wait another cycle
        }
        return nextClientInterval;
    }

    function calculateTimeUntilNextInterval(options) {
        var clientTime = options.clientTime;
        return calculateNextIntervalTime(options) - clientTime;
    }

    function calculateTimeElapsedInInterval(options) {
        var clientTime = options.clientTime;
        var intervalDuration = options.intervalDuration;
        var timeDifference = options.timeDifference;
        var serverTime = clientTime - timeDifference;
        var lastServerInterval = serverTime - serverTime % intervalDuration;
        var lastClientInterval = lastServerInterval + timeDifference;
        return clientTime - lastClientInterval;
    }

    function calculateNextBeatTime(options) {
        options.intervalDuration = options.beatDuration;
        return calculateNextIntervalTime(options);
    }

    function calculateTimeUntilNextBeat(options) {
        options.intervalDuration = options.beatDuration;
        return calculateTimeUntilNextInterval(options);
    }

    function calculateNextMeasureTime(options) {
        var beatDuration = options.beatDuration;
        var beatsPerMeasure = options.beatsPerMeasure;
        var measureDuration = beatDuration * beatsPerMeasure;
        options.intervalDuration = measureDuration;
        return calculateNextIntervalTime(options);
    }

    function calculateTimeUntilNextMeasure(options) {
        var clientTime = options.clientTime;
        return calculateNextMeasureTime(options) - clientTime;
    }

    function calculateNextCycleTime(options) {
        var beatDuration = options.beatDuration;
        var beatsPerMeasure = options.beatsPerMeasure;
        var measuresInCycle = options.measuresInCycle;
        var measureDuration = beatDuration * beatsPerMeasure;
        var cycleDuration = measureDuration * measuresInCycle;
        options.intervalDuration = cycleDuration;
        return calculateNextIntervalTime(options);
    }
    
    function calculateTimeUntilNextCycle(options) {
        var clientTime = options.clientTime;
        return calculateNextCycleTime(options) - clientTime;
    }

    function calculateTimeElapsedInBeat(options) {
        options.intervalDuration = options.beatDuration;
        return calculateTimeElapsedInInterval(options);
    }

    function calculateTimeElapsedInMeasure(options) {
        var beatDuration = options.beatDuration;
        var beatsPerMeasure = options.beatsPerMeasure;
        var measureDuration = beatDuration * beatsPerMeasure;
        options.intervalDuration = measureDuration;
        return calculateTimeElapsedInInterval(options);
    }

    function calculateTimeElapsedInCycle(options) {
        var beatDuration = options.beatDuration;
        var beatsPerMeasure = options.beatsPerMeasure;
        var measuresInCycle = options.measuresInCycle;
        var measureDuration = beatDuration * beatsPerMeasure;
        var cycleDuration = measureDuration * measuresInCycle;
        options.intervalDuration = cycleDuration;
        return calculateTimeElapsedInInterval(options);
    }

    return {
        convertPattern: function(options) {
            var fromNotesPerBeat = options.fromNotesPerBeat;
            var toNotesPerBeat = options.toNotesPerBeat;
            var oldPattern = options.pattern;
            var newPattern = [];
            var oldLength = oldPattern.length;
            var newLength = toNotesPerBeat / fromNotesPerBeat * oldLength;
            var gcd = utils.greatestCommonDivisor(toNotesPerBeat, fromNotesPerBeat);
            var inputMultiple = fromNotesPerBeat / gcd;
            var outputMultiple = toNotesPerBeat / gcd;
            for (var i = 0; i < newLength; i++) {
                newPattern[i] = 0;
            }
            for (var oldI = 0, newI = 0; oldI < oldLength && newI < newLength; ) {
                newPattern[newI] = oldPattern[oldI];
                oldI += inputMultiple;
                newI += outputMultiple;
            }
            return newPattern;
        },

        calculateMeasureNumber: function(options) {
            var startTime = options.startTime;
            var clientTime = options.clientTime;
            var beatDuration = options.beatDuration;
            var beatsPerMeasure = options.beatsPerMeasure;
            var timeDifference = options.timeDifference;
            var serverTime = clientTime - timeDifference;
            var timeElapsed = serverTime - startTime;
            var measureDuration = beatDuration * beatsPerMeasure;
            return Math.floor(timeElapsed / measureDuration) + 1;
        },

        calculateNoteNumber: function(options) {
            var beatDuration = options.beatDuration;
            var notesPerBeat = options.notesPerBeat;
            var measuresInCycle = options.measuresInCycle;
            var beatsPerMeasure = options.beatsPerMeasure;
            var notesInCycle = notesPerBeat * beatsPerMeasure * measuresInCycle;
            var timeElapsedInCycle = calculateTimeElapsedInCycle(options);
            var noteDuration = beatDuration / notesPerBeat;
            var notesElapsedInCycle = timeElapsedInCycle / noteDuration;
            notesElapsedInCycle = Math.round(notesElapsedInCycle);
            var noteNumber = notesElapsedInCycle + 1;
            if (noteNumber > notesInCycle) {
                noteNumber = 1;
            }
            return noteNumber;
        },

        calculateTimeDifference: function(options) {
            return options.clientTime - options.serverTime;
        },

        calculateNextBeatTime: calculateNextBeatTime,
        calculateNextMeasureTime: calculateNextMeasureTime,
        calculateNextCycleTime: calculateNextCycleTime,
        calculateTimeUntilNextBeat: calculateTimeUntilNextBeat,
        calculateTimeUntilNextMeasure: calculateTimeUntilNextMeasure,
        calculateTimeUntilNextCycle: calculateTimeUntilNextCycle,
        calculateTimeElapsedInBeat: calculateTimeElapsedInBeat,
        calculateTimeElapsedInMeasure: calculateTimeElapsedInMeasure,
        calculateTimeElapsedInCycle: calculateTimeElapsedInCycle
    };
})(_, utils);

/**
 * Add support for AMD (Asynchronous Module Definition) libraries such as require.js.
 */
if (typeof define === 'function' && define.amd) {
    define(function() {
        "use strict";
        return time_utils;
    });
}

/**
 * Add support for CommonJS libraries such as browserify.
 */
if (typeof exports !== 'undefined') {
    module.exports = time_utils;
}

/**
 * Define globally in case AMD is not available or available but not used
 */
if (typeof window !== 'undefined') {
    window.time_utils = time_utils;
}