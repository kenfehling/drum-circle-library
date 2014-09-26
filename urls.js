/**
 * Functions for creating and examining URLs for game rooms, etc.
 */

/*jshint strict: true */
/*global define */

define(['./constants'], function (constants) {
    "use strict";

    function isWithoutServer() {
        return window.location.protocol === "file:";
    }

    function createRelativeGameUrl(gameCode) {
        return constants.DIRS.GAME + '?' + gameCode;
    }

    function createRelativeJoinGameUrl(gameCode) {
        return constants.DIRS.JOIN_GAME + '?code=' + gameCode;
    }

    function createRelativeCreateGameUrl(gameCode) {
        return constants.DIRS.CREATE_GAME + "?" + gameCode;
    }

    function gotoPageIfNotAlready(url) {
        if (window.location.href !== url) {
            window.location.href = url;
        }
    }

    function isOnGamePage() {
        return window.location.pathname === constants.DIRS.GAME;
    }

    function getGameCodeFromUrl() {
        return window.location.search.replace("?", "");
    }

    function getAbsoluteOpenSessionUrl() {
        return browser_utils.toAbsoluteUrl(constants.DIRS.OPEN_SESSION_ENTRANCE);
    }

    function getParams() {
        return (window.location.hash || '#').substr(1);
    }

    return {
        gotoGame: function(game) {
            var params = getParams();
            params += "&drum_kit=" + game.drum_kit + "&tempo=" + game.tempo +
                      "&start_time=" + game.start_time;
            gotoPageIfNotAlready(createAbsoluteGameUrl(game._id) + "#" + params);
        },

        gotoJoinGame: function(gameCode) {
            if (isWithoutServer()) {
                window.location.href = "../../join_game/index.html";
            }
            else {
                gotoPageIfNotAlready(createAbsoluteJoinGameUrl(gameCode));
            }
        },

        gotoCreateGame: function(gameCode) {
            gotoPageIfNotAlready(createAbsoluteCreateGameUrl(gameCode));
        },

        gotoJoinOpenSession: function() {
            gotoPageIfNotAlready(getAbsoluteOpenSessionUrl());
        },

        isOnCreateGamePage: function() {
            return window.location.pathname === constants.DIRS.CREATE_GAME;
        },

        isOnOpenSessionEntrancePage: function() {
            return window.location.pathname ===
                constants.DIRS.OPEN_SESSION_ENTRANCE;
        },

        isInOpenSession: function() {
            return isOnGamePage() &&
                getGameCodeFromUrl() === constants.OPEN_SESSION_CODE;
        },

        isOnJoinGamePage: function() {
            return window.location.pathname === constants.DIRS.JOIN_GAME;
        },

        goHome: function() {
            window.location.href = "/";
        },

        isWithoutServer: isWithoutServer,
        isOnGamePage: isOnGamePage,
        getGameCodeFromUrl: getGameCodeFromUrl,
        createRelativeGameUrl: createRelativeGameUrl,
        createRelativeJoinGameUrl: createRelativeJoinGameUrl,
        createRelativeCreateGameUrl: createRelativeCreateGameUrl
    };
});