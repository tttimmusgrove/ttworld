import React from 'react';

import {connect} from 'react-redux';
import {matchActions} from 'actions';

import MatchInformation from './MatchInformation';
import Navigation from './Navigation';
import Questions from './Questions';
import Notes from './Notes';
import GameAnalysis from './GameAnalysis';

class Match extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            server: 1,
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
            playerInformation: [{
                player: 1,
                name: "Player 1",
                rating: 2000,
                record: "1-0"
            },
            {
                player: 2,
                name: "Player 2",
                rating: 1950,
                record: "2-1"
            }],
            betweenGames: false,
            questionComplexity: 1,
            resetPoint: false
        }

        this.nextPoint = this.nextPoint.bind(this);
        this.endGame = this.endGame.bind(this);
        this.nextGame = this.nextGame.bind(this);
        this.resetMatch = this.resetMatch.bind(this);
        this.changeQuestionComplexity = this.changeQuestionComplexity.bind(this);
    }
    endGame() {
        this.setState({
            betweenGames: true
        })
    }
    nextGame() {
        this.setState({
            betweenGames: false
        })
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
            this.endGame();
        }

        this.setState({
            server: server,
            scores: scores
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
    render() {
        var {server, scores, playerInformation, betweenGames, questionComplexity, resetPoint} = this.state;

        const renderQuestionArea = () => {
            if(!betweenGames) {
                return (
                    <Questions endGame={this.endGame} nextPoint={this.nextPoint} questionComplexity={questionComplexity} resetPoint={resetPoint} />
                )
            } else {
                return (
                    <GameAnalysis nextGame={this.nextGame} />
                )
            }
        }

        return (
            <div className="match">
                <MatchInformation server={server} scores={scores} playerInformation={playerInformation} />
                <Navigation changeQuestionComplexity={this.changeQuestionComplexity} questionComplexity={questionComplexity} resetMatch={this.resetMatch}/>
                {renderQuestionArea()}
                <Notes />
            </div>
        );
    }
};

export default connect(
    (state) => {
        return state;
    }
)(Match);
