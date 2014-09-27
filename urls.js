/**
 * Functions for creating and examining URLs for game rooms, etc.
 */

/*jshint strict: true */
/*global require, module */

// Let it be used on both client (browser) and command line mocha tests
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./constants'], function (constants) {
    "use strict";

    function createRelativeGameUrl(gameCode) {
        return constants.URLS.GAME + '?' + gameCode;
    }

    function createRelativeJoinGameUrl(gameCode) {
        return constants.URLS.JOIN_GAME + '?code=' + gameCode;
    }

    function createRelativeCreateGameUrl(gameCode) {
        return constants.URLS.CREATE_GAME + "?" + gameCode;
    }

    function isOnGamePage(location) {
        return location.pathname === constants.URLS.GAME;
    }

    function getGameCodeFromUrl(url) {
        var codeStart = url.indexOf('?') + 1;
        var codeEnd = url.indexOf('#');
        var length = codeEnd - codeStart;
        return parseInt(url.substr(codeStart, length));
    }

    return {
        isOnCreateGamePage: function(location) {
            return location.pathname === constants.URLS.CREATE_GAME;
        },

        isOnOpenSessionEntrancePage: function(location) {
            return location.pathname === constants.URLS.OPEN_SESSION_ENTRANCE;
        },

        isInOpenSession: function(location) {
            return isOnGamePage(location) &&
                getGameCodeFromUrl(location) === constants.OPEN_SESSION_CODE;
        },

        isOnJoinGamePage: function(location) {
            return location.pathname === constants.URLS.JOIN_GAME;
        },

        isOnGamePage: isOnGamePage,
        getGameCodeFromUrl: getGameCodeFromUrl,
        createRelativeGameUrl: createRelativeGameUrl,
        createRelativeJoinGameUrl: createRelativeJoinGameUrl,
        createRelativeCreateGameUrl: createRelativeCreateGameUrl
    };
});