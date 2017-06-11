import React from 'react';

import Paper from 'material-ui/Paper';

import service_ball from '../../../content/service-ball.png';

class Scores extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            matchScores: {},
            gameScores: {}
        }
    }
    render() {
        var {server, scores, playerInformation} = this.props;

        const renderServiceBall = () => {
            var classNames = "service-ball ";
            if(server == 1) {
                classNames += "p1-server";
            } else {
                classNames += "p2-server";
            }
            return (
                <img className={classNames} src={service_ball} />
            )
        }

        return (
            <Paper zDepth={3} className="scores">
                <div className="p1-scores">
                    <div className="p1-game-score">
                        {scores[0].gameScore}
                    </div>
                    <div className="p1-match-score">
                        {scores[0].matchScore}
                    </div>
                    <h3 className="p1-rating">{playerInformation[0].rating}</h3>
                    <h4 className="p1-record">{playerInformation[0].record}</h4>
                    {server == 1 ? renderServiceBall() : ""}
                </div>
                <div className="p2-scores">
                    <div className="p2-game-score">
                        {scores[1].gameScore}
                    </div>
                    <div className="p2-match-score">
                        {scores[1].matchScore}
                    </div>
                    <h3 className="p2-rating">{playerInformation[1].rating}</h3>
                    <h4 className="p2-record">{playerInformation[1].record}</h4>
                    {server == 2 ? renderServiceBall() : ""}
                </div>
            </Paper>
        );
    }
};

export default Scores;
