import React from 'react';

import {connect} from 'react-redux';
import {matchActions} from 'actions';

import {withRouter} from 'react-router-dom';

import MatchInformation from './MatchInformation';
import Navigation from './Navigation';
import Questions from './Questions';
import Notes from './Notes';
import GameAnalysis from './GameAnalysis';

class Match extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            server: this.props.initialServer,
            scores: [{
                player: 1,
                gameScore: 0,
                matchScore: 0
            },
            {
                player: 2,
                gameScore: 0,
                matchScore: 0
            }],
            playerInformation: this.props.playerInformation,
            pointInGame: 1,
            gameInMatch: 1,
            betweenGames: false,
            questionComplexity: 1,
            resetPoint: false,
            gameWinner: 1,
            gamesToWin: 3,
            initialServer: this.props.initialServer
        }

        this.nextPoint = this.nextPoint.bind(this);
        this.endGame = this.endGame.bind(this);
        this.nextGame = this.nextGame.bind(this);
        this.resetMatch = this.resetMatch.bind(this);
        this.changeQuestionComplexity = this.changeQuestionComplexity.bind(this);
        this.changeGamesToWin = this.changeGamesToWin.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(matchActions.startMatch(this.state.playerInformation));
    }
    endGame(gameWinner) {
        var scores = this.state.scores;
        var winnerMatchScore = scores[gameWinner - 1].matchScore;
        winnerMatchScore++;
        if(winnerMatchScore == this.state.gamesToWin) {
            this.nextGame(gameWinner)
        } else {
            this.setState({
                betweenGames: true,
                gameWinner: gameWinner
            })
        }
    }
    nextGame(matchWinner) {
        var scores = this.state.scores;
        var gameWinner = this.state.gameWinner;
        var gameInMatch = this.state.gameInMatch;
        var server = this.state.server;
        var initialServer = this.state.initialServer;
        initialServer = initialServer == 1 ? 2 : 1;

        gameInMatch++;
        scores[0].gameScore = 0;
        scores[1].gameScore = 0;
        scores[gameWinner-1].matchScore++;

        this.props.dispatch(matchActions.addGame(gameWinner-1, gameInMatch));

        if(scores[gameWinner - 1].matchScore == this.state.gamesToWin) {
            this.endMatch()
        } else {
            this.setState({
                betweenGames: false,
                scores: scores,
                gameInMatch: gameInMatch,
                pointInGame: 1,
                server: initialServer,
                initialServer: initialServer
            })
        }

    }
    nextPoint(pointWinner, gamePoint) {
        var server = this.state.server;
        var scores = this.state.scores;
        scores[pointWinner-1].gameScore++;

        if(scores[0].gameScore >= 10 && scores[1].gameScore >= 10) {
            server = server == 1 ? 2 : 1;
        } else {
            if(gamePoint % 2 == 0) {
                server = server == 1 ? 2 : 1;
            }
        }

        if(scores[pointWinner-1].gameScore > 10 && Math.abs(scores[0].gameScore - scores[1].gameScore) > 1) {
            var gameWinner;
            if(scores[0].gameScore > scores[1].gameScore) {
                gameWinner = 1
            } else {
                gameWinner = 2
            }
            this.endGame(gameWinner);
        }

        this.props.dispatch(matchActions.addPoint(pointWinner-1, this.state.gameInMatch-1));

        this.setState({
            server: server,
            scores: scores,
            pointInGame: ++this.state.pointInGame
        })
    }
    changeQuestionComplexity(value) {
        this.setState({
            questionComplexity: value,
            resetPoint: true
        })
        setTimeout(() => {
            this.setState({
                resetPoint: false
            })
        }, 1000)
    }
    changeGamesToWin(value) {
        this.setState({
            gamesToWin: value
        })
    }
    resetMatch() {
        var scores = this.state.scores;
        scores[0].gameScore = 0;
        scores[1].gameScore = 0;
        scores[0].matchScore = 0;
        scores[1].matchScore = 0;
        this.setState({
            server: 1,
            resetPoint: true,
            scores: scores

        })
        setTimeout(() => {
            this.setState({
                resetPoint: false
            })
        }, 1000)
    }
    endMatch() {
        this.props.history.push('/matchAnalysis');
    }
    render() {
        var {server, scores, playerInformation, betweenGames, questionComplexity, resetPoint, endMatch, gamesToWin, gameInMatch, pointInGame} = this.state;

        const renderQuestionArea = () => {
            if(!betweenGames) {
                return (
                    <Questions endGame={this.endGame} nextPoint={this.nextPoint} questionComplexity={questionComplexity} resetPoint={resetPoint} gameInMatch={gameInMatch} pointInGame={pointInGame} />
                )
            } else {
                return (
                    <GameAnalysis nextGame={this.nextGame} gameInMatch={gameInMatch} questionComplexity={questionComplexity} />
                )
            }
        }

        return (
            <div className="match">
                <MatchInformation server={server} scores={scores} playerInformation={playerInformation} />
                <Navigation changeQuestionComplexity={this.changeQuestionComplexity} questionComplexity={questionComplexity} resetMatch={this.resetMatch} changeGamesToWin={this.changeGamesToWin} gamesToWin={gamesToWin} />
                {renderQuestionArea()}
                <Notes />
            </div>
        );
    }
};

export default withRouter(connect(
    (state) => {
        return state;
    }
)(Match));
