/**
 * Author: Ken Fehling
 */

/*jshint strict: true */
/*global require, module, exports, define */

// Let it be used on both client (browser) and server (node.js)
if (typeof define !== 'function') {
    var _ = require("lodash");
}

var constants = (function(_) {
    "use strict";
    var PLAYER_COLORS = ['blue', 'red', 'green', 'yellow', 'purple', 'orange'];
    var OPEN_SESSION_PLAYER_COLORS = _.without(PLAYER_COLORS, "orange");
    var NOTES = {
        D3: 146.83,
        E3: 164.81,
        G3: 196.00,
        A3: 220.00,
        C4: 261.63,
        D4: 293.67,
        E4: 329.63,
        G4: 392,
        A4: 440,
        C5: 523.25,
        D5: 587.33,
        E5: 659.25
        //G5: 783.99
        //A5: 880
    };
    return {
        APP_NAME: "Drum Circle",
        FANOUT_REALM: "63969fc2",
        GRANULARITY: 1,  // Allowable error in ms, may affect performance
        DRUM_VOLUME: 1.0,
        SYNTH_VOLUME: 0.05, //0.025,
        BEAT_DIVISIONS: [4, 6, 8],  // For different screen sizes
        SYNTH_ENVELOPE: [[3, 5.5], 1.0, 1.0, 1.0],  // Params can be ranges
        TEMPO: {
            CHOICES: [15,30,60,120],
            DEFAULT: 60
        },
        SYNTH_NOTE_BEAT_DURATIONS_BY_TEMPO: {
            15: [1, 2, 4],  // Quarter, half, or whole note
            30: [2, 4],     // Half note or whole note
            60: [2, 4],     // Half note or whole note
            120: [4]        // Whole note only
        },
        BEATS_PER_MEASURE: 4,
        MEASURES_IN_CYCLE: 1,
        TIME_SYNCH_REQUESTS: 20,
        GAME_CODE_LENGTH: 3,
        PSEUDO_TOUCH_RESPONSE_VARIATION: 0.05,
        ALLOW_SEND_EFFECT_TO_SELF_IN_GAME: false,
        ALLOW_SEND_EFFECT_TO_SELF_IN_OPEN_SESSION: true,
        CONFIRM_QUIT_GAME_IN_PROGRESS: true,
        CONFIRM_QUIT_CREATED_GAME: true,
        MS_PER_DRUM_SAMPLE: 4000,
        DEFAULT_PORT: 5000,
        PLAYER_COLORS: PLAYER_COLORS,
        OPEN_SESSION_PLAYER_COLORS: OPEN_SESSION_PLAYER_COLORS,
        MIN_PLAYERS: 2,
        MAX_PLAYERS: PLAYER_COLORS.length,
        OPEN_SESSION_CODE: 'OPEN_SESSION',
        USE_ARROW_SWIPING: false,
        USE_DRUM_EQ: true,
        EQ: {
            SYNTH_FREQ_RANGE: [350, 2000],
            DRUM_FREQ_RANGE: [500, 1000],
            SYNTH_Q_RANGE: [1, 20],
            DRUM_Q_RANGE: [0.1, 0.1]
        },
        NOTES: NOTES,
        SYNTH_NOTE_RANGE: [NOTES.A3, NOTES.A4],
        DRUM_KITS: [
            {
                name: 'Lacuna Rock Kit',
                path: 'Lacuna_Rock_Kit',
                drums: ['KICK', 'SNARE', 'HIGHTOM', 'LOWTOM', 'HIHAT', 'CRASH']
            }
            /*
            {
                name: 'Retro Kit',
                path: 'retrokit',
                drums: ['KICK', 'SNARE', 'HIGHTOM', 'LOWTOM', 'COWBELL', 'HANDCLAP']
            }
            */
        ],
        DEFAULT_PATTERNS: {
            'KICK': {
                4: [
                    1, 0, 0, 0,
                    1, 0, 1, 0,
                    1, 0, 0, 0,
                    1, 0, 0, 0
                ],
                6: [
                    1, 0, 0, 0, 0, 0,
                    1, 0, 0, 1, 0, 0,
                    1, 0, 0, 0, 0, 0,
                    1, 0, 0, 1, 0, 0
                ],
                8: [
                    1, 0, 0, 0, 1, 0, 0, 0,  // Blue Monday
                    1, 1, 1, 1, 1, 1, 1, 1,
                    1, 0, 0, 0, 1, 0, 0, 0,
                    1, 0, 0, 0, 1, 0, 0, 0
                    /*
                    1, 0, 0, 0, 1, 0, 0, 0,
                    1, 0, 1, 0, 1, 0, 1, 0,
                    1, 0, 0, 0, 1, 0, 0, 0,
                    1, 0, 0, 1, 1, 0, 1, 0
                    */
                ]
            },
            'SNARE': {
                4: [
                    0, 0, 1, 0,
                    0, 0, 1, 0,
                    0, 0, 1, 0,
                    0, 0, 1, 0
                ],
                6: [
                    0, 0, 0, 1, 0, 0,
                    0, 0, 0, 1, 0, 0,
                    0, 0, 0, 1, 0, 0,
                    0, 0, 0, 1, 0, 0
                ],
                8: [
                    0, 1, 0, 0, 0, 1, 0, 0,
                    1, 0, 0, 1, 0, 0, 1, 0,
                    0, 0, 0, 0, 1, 0, 1, 1,
                    0, 0, 0, 0, 0, 0, 1, 1
                ]
            },
            'HIGHTOM': {
                4: [
                    0, 1, 0, 0,
                    0, 0, 0, 0,
                    1, 0, 0, 0,
                    0, 1, 0, 1
                ],
                6: [
                    1, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0,
                    1, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0
                ],
                8: [
                    0, 0, 1, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 1, 0,
                    1, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0
                ]
            },
            'LOWTOM': {
                4: [
                    1, 0, 1, 1,
                    1, 0, 1, 0,
                    0, 0, 0, 0,
                    1, 0, 0, 1
                ],
                6: [
                    1, 0, 0, 1, 0, 0,
                    0, 0, 0, 0, 0, 0,
                    1, 0, 0, 0, 0, 0,
                    0, 0, 0, 1, 1, 1
                ],
                8: [
                    1, 0, 0, 1, 0, 0, 0, 1,
                    1, 0, 1, 0, 1, 0, 1, 1,
                    0, 0, 0, 1, 0, 0, 0, 0,
                    0, 1, 0, 1, 0, 0, 1, 1
                ]
            },
            'DEFAULT': {
                4: [
                    1, 0, 1, 0,
                    0, 0, 0, 0,
                    1, 0, 1, 0,
                    0, 0, 0, 0
                ],
                6: [
                    1, 0, 0, 1, 0, 0,
                    0, 0, 0, 0, 0, 0,
                    1, 0, 0, 1, 0, 0,
                    0, 0, 0, 0, 0, 0
                ],
                8: [
                    1, 0, 0, 0, 1, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    1, 0, 0, 0, 1, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0
                ]
            }
        },
        DIRS: {
            GAME: '/game/',
            JOIN_GAME: '/join_game/',
            CREATE_GAME: '/create_game/',
            OPEN_SESSION_ENTRANCE: '/open_session/',
            DRUMS: '/drums/'
        },
        EVENTS : {
            EFFECT_RECEIVE: "effect r",
            EFFECT_SEND: "eff s",
            EFFECT_SELECTED: 'eff sel',
            EFFECT_UNSELECTED: 'eff unsel',
            PLAYER_JOIN: "plr j",
            PLAYER_LEAVE: "plr l",
            PLAYER_DISCONNECT: "plr d",
            PLAYER_RECONNECT: "plr r",
            RECONNECT_TO_GAME: "recon_game",
            RECONNECT_TO_CREATE_GAME: "recon_crt",
            PLAYER_LIST: "plrs",
            TIME_CHECK: 't_chk',
            TIME_RESPONSE: 't_resp',
            CREATE_GAME: 'crt_g',
            JOIN_GAME: 'j_game',
            PLAY_GAME: 'p_game',
            START_GAME: 's_game',
            QUIT_GAME: 'q_game',
            GAME_JOINED: 'game jd',
            GAME_STARTED: 'game sd',
            TIME_SYNCHRONIZED: 't_sync',
            AUDIO_INITIALIZING: 'init_audio',
            SYNTH_STARTED: 'synth_std',
            PLAY_AUDIO: 'play_audio',
            PAUSE_AUDIO: 'pause_audio',
            DRUM_SELECTED: 'drum_selected',
            NEXT_MEASURE: 'next_meas',
            NEXT_BEAT: 'next_beat',
            NEXT_NOTE: 'next_note',
            PLAY_DRUM: 'play_drum',
            GYROSCOPE_BEND: 'gyro',
            FIND_MY_GAME: 'game f',
            ALREADY_IN_A_GAME: 'already_g',
            YOU_QUIT_GAME: 'you_quit',
            ENTER_OPEN_SESSION: 'ent_op_s',
            NOTES_PER_BEAT_SET: 'npb_set',
            GET_SYSTEM_INFO: "get sys info",
            SYSTEM_INFO_RECEIVE: "sys info",
            ERROR: 'error'
        },
        STATES: {
            AUDIO : {
                NOT_STARTED: 0,
                PLAYING: 1,
                PAUSED_BY_USER: 2,
                PAUSED_BY_SYSTEM: 3
            },
            GAME : {
                CREATING: 0,
                RUNNING: 1
            }
        }
    };
})(_);

/**
 * Add support for AMD (Asynchronous Module Definition) libraries such as require.js.
 */
if (typeof define === 'function' && define.amd) {
    define(function() {
        "use strict";
        return constants;
    });
}

/**
 * Add support for CommonJS libraries such as browserify.
 */
if (typeof exports !== 'undefined') {
    module.exports = constants;
}

/**
 * Define globally in case AMD is not available or available but not used
 */
if (typeof window !== 'undefined') {
    window.constants = constants;
}