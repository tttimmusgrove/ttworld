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
        return (
            <Paper zDepth={3} className="scores">
                <div className="p1-scores">
                    <div className="p1-game-score">
                        0
                    </div>
                    <div className="p1-match-score">
                        2
                    </div>
                    <img className="service-ball" src={service_ball} />
                </div>
                <div className="p2-scores">
                    <div className="p2-game-score">
                        1
                    </div>
                    <div className="p2-match-score">
                        3
                    </div>
                </div>
            </Paper>
        );
    }
};

export default Scores;
