//Redux actions for current User including calls to api file

import {userAPI} from '../api/api';

export var startMatch = (playerInformation) => {
    return {
        type: "START_MATCH",
        playerInformation
    }
}

export var addPoint = (winner, gameInMatch) => {
    return {
        type: "ADD_POINT",
        winner,
        gameInMatch
    }
}

export var addGame = (winner, gameInMatch) => {
    return {
        type: "ADD_GAME",
        winner,
        gameInMatch
    }
}

export var addAnswer = (pointInGame, gameInMatch, question, answer) => {
    return {
        type: "ADD_ANSWER",
        pointInGame,
        gameInMatch,
        question,
        answer
    }
}
