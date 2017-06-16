import React from 'react';

import Match from "./Match";
import PreMatch from "./PreMatch";

class MatchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            preMatchSettings: true,
            playerInformation: undefined,
            initialServer: 1
        }

        this.startMatch = this.startMatch.bind(this);
    }
    startMatch(playerInformation, server) {
        this.setState({
            preMatchSettings: false,
            playerInformation: playerInformation,
            initialServer: server
        })
    }
    render() {
        var {preMatchSettings, playerInformation, initialServer} = this.state;

        const renderMatch = () => {
            if(preMatchSettings) {
                return (
                    <PreMatch startMatch={this.startMatch} setInitialServer={this.setInitialServer} />
                )
            } else {
                return (
                    <Match playerInformation={playerInformation} initialServer={initialServer} />
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
