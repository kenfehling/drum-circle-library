/**
 * Time utils unit tests in nodeunit
 * Author: Ken Fehling
 */

/*jshint strict: true */
/*global require, module, exports */

var time_utils = require('../time_utils');

exports.testConvertPattern1 = function(test) {
    "use strict";
    var pattern = time_utils.convertPattern({
        pattern: [
            1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1
        ],
        fromNotesPerBeat: 4,
        toNotesPerBeat: 6
    });
    test.deepEqual(pattern, [
        1, 0, 0, 1, 0, 0,
        1, 0, 0, 1, 0, 0,
        1, 0, 0, 1, 0, 0,
        1, 0, 0, 1, 0, 0
    ]);
    test.done();
};

exports.testConvertPattern2 = function(test) {
    "use strict";
    var pattern = time_utils.convertPattern({
        pattern: [
            1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1
        ],
        fromNotesPerBeat: 4,
        toNotesPerBeat: 8
    });
    test.deepEqual(pattern, [
        1, 0, 1, 0, 1, 0, 1, 0,
        1, 0, 1, 0, 1, 0, 1, 0,
        1, 0, 1, 0, 1, 0, 1, 0,
        1, 0, 1, 0, 1, 0, 1, 0
    ]);
    test.done();
};

exports.testConvertPattern3 = function(test) {
    "use strict";
    var pattern = time_utils.convertPattern({
        pattern: [
            1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1
        ],
        fromNotesPerBeat: 6,
        toNotesPerBeat: 4
    });
    test.deepEqual(pattern, [
        1, 0, 1, 0,
        1, 0, 1, 0,
        1, 0 ,1, 0,
        1, 0, 1, 0
    ]);
    test.done();
};

exports.testConvertPattern4 = function(test) {
    "use strict";
    var pattern = time_utils.convertPattern({
        pattern: [
            1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1
        ],
        fromNotesPerBeat: 6,
        toNotesPerBeat: 8
    });
    test.deepEqual(pattern, [
        1, 0, 0, 0, 1, 0, 0, 0,
        1, 0, 0, 0, 1, 0, 0, 0,
        1, 0, 0, 0, 1, 0, 0, 0,
        1, 0, 0, 0, 1, 0, 0, 0
    ]);
    test.done();
};

exports.testConvertPattern5 = function(test) {
    "use strict";
    var pattern = time_utils.convertPattern({
        pattern: [
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1
        ],
        fromNotesPerBeat: 8,
        toNotesPerBeat: 6
    });
    test.deepEqual(pattern, [
        1, 0, 0, 1, 0, 0,
        1, 0, 0, 1, 0, 0,
        1, 0, 0, 1, 0, 0,
        1, 0, 0, 1, 0, 0
    ]);
    test.done();
};

exports.testConvertPattern6 = function(test) {
    "use strict";
    var pattern = time_utils.convertPattern({
        pattern: [
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1
        ],
        fromNotesPerBeat: 8,
        toNotesPerBeat: 4
    });
    test.deepEqual(pattern, [
        1, 1, 1, 1,
        1, 1, 1, 1,
        1, 1, 1, 1,
        1, 1, 1, 1
    ]);
    test.done();
};

exports.testConvertPattern7 = function(test) {
    "use strict";
    var pattern = time_utils.convertPattern({
        pattern: [
            1, 1, 1, 0,
            1, 1, 1, 0,
            1, 1, 1, 0,
            1, 1, 1, 0
        ],
        fromNotesPerBeat: 4,
        toNotesPerBeat: 4
    });
    test.deepEqual(pattern, [
        1, 1, 1, 0,
        1, 1, 1, 0,
        1, 1, 1, 0,
        1, 1, 1, 0
    ]);
    test.done();
};

exports.testMeasureNumber1 = function(test) {
    "use strict";
    var measureNumber = time_utils.calculateMeasureNumber({
        startTime: createTime(0, 0, 0),       // Start time: 12:00:00 AM
        clientTime: createTime(0, 0, 1, 10),  // Client time: 12:00:01.010 AM
        timeDifference: 1000,                 // Server time: 12:00:00.010 AM
        beatDuration: 1000,
        beatsPerMeasure: 4
    });
    test.equal(measureNumber, 1);
    test.done();
};

exports.testMeasureNumber2 = function(test) {
    "use strict";
    var measureNumber = time_utils.calculateMeasureNumber({
        startTime: createTime(0, 0, 0),       // Start time: 12:00:00 AM
        clientTime: createTime(0, 0, 1, 10),  // Client time: 12:00:01.010 AM
        timeDifference: -1000,                // Server time: 12:00:02.010 AM
        beatDuration: 1000,
        beatsPerMeasure: 4
    });
    test.equal(measureNumber, 1);
    test.done();
};

exports.testMeasureNumber3 = function(test) {
    "use strict";
    var measureNumber = time_utils.calculateMeasureNumber({
        startTime: createTime(0, 0, 0),         // Start time: 12:00:00 AM
        clientTime: createTime(0, 0, 11, 900),  // Client time: 12:00:11.900 AM
        timeDifference: -1000,                  // Server time: 12:00:12.900 AM
        beatDuration: 6000,
        beatsPerMeasure: 1
    });
    test.equal(measureNumber, 3);
    test.done();
};

exports.testMeasureNumber4 = function(test) {
    "use strict";
    var measureNumber = time_utils.calculateMeasureNumber({
        startTime: createTime(0, 0, 0),         // Start time: 12:00:00 AM
        clientTime: createTime(0, 0, 11, 900),  // Client time: 12:00:11.900 AM
        timeDifference: -1000,                  // Server time: 12:00:12.900 AM
        beatDuration: 1000,
        beatsPerMeasure: 4
    });
    test.equal(measureNumber, 4);
    test.done();
};

exports.testNextNoteNumber1 = function(test) {
    "use strict";
    var nextNoteNumber = time_utils.calculateNoteNumber({
        clientTime: createTime(0, 0, 1, 10),  // Client time: 12:00:01.010 AM
        timeDifference: 1000,                 // Server time: 12:00:00.010 AM
        beatDuration: 1000,
        beatsPerMeasure: 4,
        notesPerBeat: 1,
        measuresInCycle: 1
    });
    test.equal(nextNoteNumber, 1);  // First beat is 1
    test.done();
};

exports.testNextNoteNumber2 = function(test) {
    "use strict";
    var nextNoteNumber = time_utils.calculateNoteNumber({
        clientTime: createTime(0, 0, 1, 10),  // Client time: 12:00:01.010 AM
        timeDifference: -1000,                // Server time: 12:00:02.010 AM
        beatDuration: 1000,
        beatsPerMeasure: 4,
        notesPerBeat: 1,
        measuresInCycle: 1
    });
    test.equal(nextNoteNumber, 3);
    test.done();
};

exports.testNextNoteNumber3 = function(test) {
    "use strict";
    var nextNoteNumber = time_utils.calculateNoteNumber({
        clientTime: createTime(0, 0, 11, 900),  // Client time: 12:00:11.900 AM
        timeDifference: -1000,                  // Server time: 12:00:12.900 AM
        beatDuration: 1000,
        beatsPerMeasure: 4,
        notesPerBeat: 1,
        measuresInCycle: 2
    });
    test.equal(nextNoteNumber, 6);
    test.done();
};

exports.testTimeUntilNextCycle1 = function(test) {
    "use strict";
    var timeUntilNextCycle = time_utils.calculateTimeUntilNextCycle({
        clientTime: createTime(0, 0, 1),  // Client time: 12:00:01 AM
        timeDifference: -1000,            // Server time: 12:00:02 AM
        beatDuration: 1000,
        beatsPerMeasure: 4,
        measuresInCycle: 2
    });
    test.equal(timeUntilNextCycle, 6000);
    test.done();
};

exports.testTimeUntilNextCycle2 = function(test) {
    "use strict";
    var timeUntilNextCycle = time_utils.calculateTimeUntilNextCycle({
        clientTime: createTime(0, 0, 1),  // Client time: 12:00:01 AM
        timeDifference: 1000,             // Server time: 12:00:00 AM
        beatDuration: 1000,
        beatsPerMeasure: 4,
        measuresInCycle: 2
    });
    test.equal(timeUntilNextCycle, 8000);
    test.done();
};

exports.testTimeElapsedInCycle1 = function(test) {
    "use strict";
    var timeElapsedInCycle = time_utils.calculateTimeElapsedInCycle({
        clientTime: createTime(0, 0, 1, 500),  // Client time: 12:00:01.500 AM
        timeDifference: -1000,                 // Server time: 12:00:02.500 AM
        beatDuration: 1000,
        beatsPerMeasure: 4,
        measuresInCycle: 2
    });
    test.equal(timeElapsedInCycle, 2500);
    test.done();
};

exports.testTimeElapsedInCycle2 = function(test) {
    "use strict";
    var timeElapsedInCycle = time_utils.calculateTimeElapsedInCycle({
        clientTime: createTime(0, 0, 1),  // Client time: 12:00:01 AM
        timeDifference: 1000,             // Server time: 12:00:00 AM
        beatDuration: 1000,
        beatsPerMeasure: 4,
        measuresInCycle: 2
    });
    test.equal(timeElapsedInCycle, 0);
    test.done();
};

exports.testTimeUntilNextMeasure1 = function(test) {
    "use strict";
    var timeUntilNextMeasure = time_utils.calculateTimeUntilNextMeasure({
        clientTime: createTime(0, 0, 1),  // Client time: 12:00:01 AM
        timeDifference: -1000,            // Server time: 12:00:02 AM
        beatDuration: 1000,
        beatsPerMeasure: 4
    });
    test.equal(timeUntilNextMeasure, 2000);
    test.done();
};

exports.testTimeUntilNextMeasure2 = function(test) {
    "use strict";
    var timeUntilNextMeasure = time_utils.calculateTimeUntilNextMeasure({
        clientTime: createTime(0, 0, 1),  // Client time: 12:00:01 AM
        timeDifference: 1000,             // Server time: 12:00:00 AM
        beatDuration: 1000,
        beatsPerMeasure: 4
    });
    test.equal(timeUntilNextMeasure, 4000);
    test.done();
};

exports.testTimeElapsedInMeasure1 = function(test) {
    "use strict";
    var timeElapsedInMeasure = time_utils.calculateTimeElapsedInMeasure({
        clientTime: createTime(0, 0, 1, 500),  // Client time: 12:00:01.500 AM
        timeDifference: -1000,                 // Server time: 12:00:02.500 AM
        beatDuration: 1000,
        beatsPerMeasure: 4
    });
    test.equal(timeElapsedInMeasure, 2500);
    test.done();
};

exports.testTimeElapsedInMeasure2 = function(test) {
    "use strict";
    var timeElapsedInMeasure = time_utils.calculateTimeElapsedInMeasure({
        clientTime: createTime(0, 0, 1),  // Client time: 12:00:01 AM
        timeDifference: 1000,             // Server time: 12:00:00 AM
        beatDuration: 1000,
        beatsPerMeasure: 4
    });
    test.equal(timeElapsedInMeasure, 0);
    test.done();
};

exports.testTimeUntilNextBeat1 = function(test) {
    "use strict";
    var timeUntilNextBeat = time_utils.calculateTimeUntilNextBeat({
        clientTime: createTime(0, 0, 1, 500),  // Client time: 12:00:01.500 AM
        timeDifference: -1000,                 // Server time: 12:00:02.500 AM
        beatDuration: 1000
    });
    test.equal(timeUntilNextBeat, 500);
    test.done();
};

exports.testTimeUntilNextBeat2 = function(test) {
    "use strict";
    var timeUntilNextBeat = time_utils.calculateTimeUntilNextBeat({
        clientTime: createTime(0, 0, 1),  // Client time: 12:00:01 AM
        timeDifference: 1000,             // Server time: 12:00:00 AM
        beatDuration: 1000
    });
    test.equal(timeUntilNextBeat, 1000);
    test.done();
};

exports.testTimeElapsedInBeat1 = function(test) {
    "use strict";
    var timeElapsedNextBeat = time_utils.calculateTimeElapsedInBeat({
        clientTime: createTime(0, 0, 1, 500),  // Client time: 12:00:01.500 AM
        timeDifference: -1000,                 // Server time: 12:00:02.500 AM
        beatDuration: 1000
    });
    test.equal(timeElapsedNextBeat, 500);
    test.done();
};

exports.testTimeElapsedInBeat2 = function(test) {
    "use strict";
    var timeElapsedNextBeat = time_utils.calculateTimeElapsedInBeat({
        clientTime: createTime(0, 0, 1),  // Client time: 12:00:01 AM
        timeDifference: 1000,             // Server time: 12:00:00 AM
        beatDuration: 1000
    });
    test.equal(timeElapsedNextBeat, 0);
    test.done();
};

exports.testTimeDifference1 = function(test) {
    "use strict";
    var timeDifference = time_utils.calculateTimeDifference({
        clientTime: createTime(8, 0, 0),  // Client time: 8:00:00 AM
        serverTime: createTime(8, 0, 1)   // Server time: 8:00:01 AM
    });
    test.equal(timeDifference, -1000);
    test.done();
};

exports.testTimeDifference2 = function(test) {
    "use strict";
    var timeDifference = time_utils.calculateTimeDifference({
        clientTime: createTime(0, 0, 1),  // Client time: 12:00:01 AM
        serverTime: createTime(0, 0, 0)   // Server time: 12:00:00 AM
    });
    test.equal(timeDifference, 1000);
    test.done();
};

function createTime(hours, minutes, seconds, ms) {
    "use strict";
    return new Date(1970, 1, 1, hours, minutes, seconds, ms || 0).getTime();
}