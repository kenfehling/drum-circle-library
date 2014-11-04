/**
 * Author: Ken Fehling
 */

/*jshint strict: true */
/*global require, module */

// Let it be used on both client (browser) and server (node.js)
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['lodash'], function(_) {
    "use strict";
    var PLAYER_COLORS = ['blue', 'red', 'green', 'yellow', 'purple', 'orange'];
    var NOTES = {
        A2: 110,
        C3: 130.81,
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
        E5: 659.25,
        G5: 783.99,
        A5: 880
    };
    var DEFAULT_API_PORT = 8080;
    var DEFAULT_API_HOST = 'http://localhost:' + DEFAULT_API_PORT;
    return {
        APP_NAME: "Drum Circle",
        FANOUT_REALM: "63969fc2",
        SYNTH_PAD_NOTE_RANGE: [NOTES.A2, NOTES.A3],
        SYNTH_LEAD_NOTES: {
            'kick': [NOTES.D3, NOTES.A2, NOTES.A3],
            'snare': [NOTES.D4, NOTES.D5, NOTES.A4],
            'hightom': [NOTES.A4, NOTES.C5, NOTES.D5],
            'lowtom': [NOTES.A3, NOTES.A4, NOTES.A5],
            'hihat': [NOTES.C5, NOTES.E5, NOTES.A5],
            'default': [NOTES.A3, NOTES.A4, NOTES.A5]
        },
        DRUM_VOLUME: 1.0,
        MAX_SYNTH_VOLUME: 0.5,
        SYNTH_PAD_ENVELOPE: [7, 2, 1, 0],
        MIN_PLAYERS: 2,
        MAX_PLAYERS: PLAYER_COLORS.length,
        NUM_DRUMS_IN_KIT: 6,
        GRANULARITY: 1,  // Allowable error in ms, may affect performance
        BEAT_DIVISIONS: [4, 6, 8],  // For different screen sizes
        TEMPO: {
            CHOICES: [15, 30, 60, 120],
            DEFAULT: 60
        },
        SYNTH_PAD_BEAT_DURATIONS_BY_TEMPO: {
            15: [1, 2, 4],  // Quarter, half, or whole note
            30: [2, 4],     // Half note or whole note
            60: [2, 4],     // Half note or whole note
            120: [4]        // Whole note only
        },
        BEATS_PER_MEASURE: 4,
        MEASURES_IN_CYCLE: 1,
        TIME_SYNCH_REQUESTS: 20,
        PSEUDO_TOUCH_RESPONSE_VARIATION: 0.05,
        USE_DRUM_EQ: false,
        SECONDS_PER_DRUM_SAMPLE: 4,
        CIRCLE_POSITION_SCREEN_DURATION: 5000,
        DEFAULT_WEB_PORT: 5000,
        STATIC_DIRECTORY: '/public',
        COMPILED_STATIC_DIRECTORY: '/public-built',
        DEFAULT_API_PORT: DEFAULT_API_PORT,
        DEFAULT_API_HOST: DEFAULT_API_HOST,
        REMOTE_API_HOST: 'http://drum-circle-api.herokuapp.com',
        PRODUCTION_WEB_HOST: 'drumcircle.io',
        PLAYER_COLORS: PLAYER_COLORS,
        OPEN_SESSION_PLAYER_COLORS: _.initial(PLAYER_COLORS),
        OPEN_SESSION_CODE: 100,
        EQ: {
            SYNTH_FREQ_RANGE: [350, 2000],
            DRUM_FREQ_RANGE: [500, 1000],
            SYNTH_Q_RANGE: [2, 20],
            DRUM_Q_RANGE: [0.1, 0.1]
        },
        GYROSCOPE_X_RANGE: [-5, 5],
        GYROSCOPE_Y_RANGE: [-7, 7],
        NOTES: NOTES,
        PARAMS: ['color', 'drum', 'drum_kit', 'tempo', 'start_time', 'running'],
        EFFECTS: {
            DRUM: [ 'reverb', 'bitcrush' ],
            SEQUENCER: [ 'silence', 'random' ]
        },
        DRUM_KITS: [
            {
                name: 'Lacuna Rock Kit',
                path: 'Lacuna_Rock_Kit',
                drums: ['kick', 'snare', 'hightom', 'lowtom', 'hihat', 'lowsnare']
            },
            {
                name: "Derek's Percussion",
                path: 'derek_drums',
                drums: ['wrench', 'flowerPot', 'metalDish', 'metalPipe', 'springDrum', 'gong' ]
            }
            /*
             {
             name: 'Retro Kit',
             path: 'retrokit',
             drums: ['kick', 'snare', 'hightom', 'lowtom', 'cowbell', 'handclap']
             }
             */
        ],
        DEFAULT_PATTERNS: {
            'kick': {
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
            'snare': {
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
            'hightom': {
                4: [
                    1, 1, 0, 0,
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
                    1, 0, 1, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 1, 0,
                    1, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0
                ]
            },
            'lowtom': {
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
            'default': {
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
        URLS: {
            GAME: '/game.html',
            JOIN_GAME: '/join-game/',
            CREATE_GAME: '/create-game/',
            OPEN_SESSION_ENTRANCE: '/open_session.html',
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
            JOIN_GAME: 'j_game',
            PLAY_GAME: 'p_game',
            GAME_STARTED: 'game sd',
            TIME_SYNCHRONIZED: 't_sync',
            SYNTH_STARTED: 'synth_std',
            START_PRESSED: 'start_pressed',
            PAUSE_PRESSED: 'pause_pressed',
            INITIALIZE_AUDIO: 'init_audio',
            WEB_AUDIO_CONTEXT_CREATED: 'wac_created',
            PLAY_AUDIO: 'play_audio',
            PAUSE_AUDIO: 'pause_audio',
            DRUM_SELECTED: 'drum_selected',
            NEXT_MEASURE: 'next_meas',
            NEXT_BEAT: 'next_beat',
            NEXT_NOTE: 'next_note',
            PLAY_DRUM: 'play_drum',
            GYROSCOPE_BEND: 'gyro',
            NOTES_PER_BEAT_SET: 'npb_set',
            TEMPO_SET: 'tempo_set',
            START_TIME_SET: 'start_time_set'
        },
        STATES: {
            AUDIO : {
                NOT_STARTED: 'not_started',
                PLAYING: 'playing',
                PAUSED_BY_USER: 'user_paused',
                PAUSED_BY_SYSTEM: 'sys_paused'
            }
        }
    };
});