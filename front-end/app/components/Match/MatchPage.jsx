import React from 'react';

import Match from "./Match";
import PreMatch from "./PreMatch";

class MatchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            preMatchSettings: true,
            playerInformation: undefined
        }

        this.startMatch = this.startMatch.bind(this);
    }
    startMatch(playerInformation) {
        this.setState({
            preMatchSettings: false,
            playerInformation: playerInformation
        })
    }
    render() {
        var {preMatchSettings, playerInformation} = this.state;

        const renderMatch = () => {
            if(preMatchSettings) {
                return (
                    <PreMatch startMatch={this.startMatch} />
                )
            } else {
                return (
                    <Match playerInformation={playerInformation} />
                )
            }
        }

        return (
            <div className="match-container">
                {renderMatch()}
            </div>
        );
    }
};

export default MatchPage;
