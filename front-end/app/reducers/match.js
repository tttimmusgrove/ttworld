export var matchReducer = (state = {}, action) => {
    switch(action.type) {
        case "START_MATCH":
            return {
                playerInformation: action.playerInformation,
                scores: [{
                    player: 1,
                    gameScores: [0],
                    matchScore: 0
                },
                {
                    player: 2,
                    gameScores: [0],
                    matchScore: 0
                }],
                questionAnswers: [{
                    game: 1,
                    points: [[]]
                }]
            }
        case "ADD_POINT":
            var scores = state.scores;
            var questionAnswers = state.questionAnswers;

            questionAnswers[action.gameInMatch].points.push([]);
            scores[action.winner].gameScores[action.gameInMatch]++;

            return {
                playerInformation: state.playerInformation,
                questionAnswers: state.questionAnswers,
                scores: scores
            }
        case "ADD_GAME":
            var scores = state.scores;
            var questionAnswers = state.questionAnswers;

            scores[action.winner].matchScore++;
            scores[action.winner].gameScores.push(0);
            if(action.winner == 0) {
                scores[action.winner+1].gameScores.push(0);
            } else {
                scores[action.winner-1].gameScores.push(0);
            }

            questionAnswers.push({
                game: action.gameInMatch,
                answers: []
            })

            return {
                playerInformation: state.playerInformation,
                questionAnswers: questionAnswers,
                scores: scores
            }
        case "ADD_ANSWER":
            var questionAnswers = state.questionAnswers;

            questionAnswers[action.gameInMatch].points[action.pointInGame].push("");
            questionAnswers[action.gameInMatch].points[action.pointInGame][action.question] = action.answer;

            return {
                playerInformation: state.playerInformation,
                scores: state.scores,
                questionAnswers: questionAnswers
            }
        default:
            return state
    }
};
