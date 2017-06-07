import React from 'react';

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
            <div className="scores">
                <div className="left-game-score"></div>
                <div className="right-game-score"></div>
                <div className="match-score">
                    <div className="left-match-score"></div>
                    <div className="right-match-score"></div>
                </div>
            </div>
        );
    }
};

export default Scores;
