import React from 'react';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class PreMatch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            matchType: 1,
            playerInformation: [{
                player: 1,
                name: "",
                rating: "",
                record: ""
            },
            {
                player: 2,
                name: "",
                rating: "",
                record: ""
            }],
            attemptedSubmit: false
        }

        this.handleMatchTypeChange = this.handleMatchTypeChange.bind(this);
        this.handlePlayerInformation = this.handlePlayerInformation.bind(this);
        this.startMatch = this.startMatch.bind(this);
    }
    handleMatchTypeChange(event, index, value) {
        this.setState({
            matchType: value
        })
    }
    handlePlayerInformation(event, field) {
        var playerInformation = this.state.playerInformation;

        if(field == 1) {
            playerInformation[0].name = event.target.value;
        } else if (field == 2) {
            playerInformation[0].rating = event.target.value;
        } else if (field == 3) {
            playerInformation[0].record = event.target.value;
        } else if (field == 4) {
            playerInformation[1].name = event.target.value;
        } else if (field == 5) {
            playerInformation[1].rating = event.target.value;
        } else if (field == 6) {
            playerInformation[1].record = event.target.value;
        }

        this.setState({
            playerInformation: playerInformation
        })
    }
    startMatch() {
        var playerInformation = this.state.playerInformation;

        if(playerInformation[0].name && playerInformation[0].rating && playerInformation[0].record && playerInformation[1].name && playerInformation[1].rating && playerInformation[1].record) {
            this.props.startMatch(playerInformation)
        } else {
            this.setState({
                attemptedSubmit: true
            })
        }
    }
    render() {
        var {matchType, playerInformation, attemptedSubmit} = this.state;

        return (
            <div className="pre-match">
                <div className="pre-match-information">
                    <h2>Match Settings</h2>
                    <SelectField
                      floatingLabelText="Match Type"
                      value={matchType}
                      onChange={this.handleMatchTypeChange}
                    >
                      <MenuItem value={1} primaryText="Singles" />
                      <MenuItem value={2} primaryText="Doubles - Coming Soon" disabled={true} />
                    </SelectField>
                </div>
                <hr />
                <div className="pre-match-players-information">
                    <div className="pre-match-player-information">
                        <h2 className="pre-match-player-information-header">Player Information</h2>
                        <TextField
                            floatingLabelText="Name"
                            errorText={attemptedSubmit && !playerInformation[0].name ? "This field is required" : ""}
                            onChange={(event) => this.handlePlayerInformation(event, 1)}
                        />
                        <br/>
                        <TextField
                            floatingLabelText="Rating"
                            errorText={attemptedSubmit && !playerInformation[0].rating ? "This field is required" : ""}
                            onChange={(event) => this.handlePlayerInformation(event, 2)}
                        />
                        <br/>
                        <TextField
                            floatingLabelText="Record"
                            errorText={attemptedSubmit && !playerInformation[0].record ? "This field is required" : ""}
                            onChange={(event) => this.handlePlayerInformation(event, 3)}
                        />
                    </div>
                    <div className="pre-match-opponent-information">
                        <h2 className="pre-match-opponent-information-header">Opponent Information</h2>
                        <TextField
                            floatingLabelText="Name"
                            errorText={attemptedSubmit && !playerInformation[1].name ? "This field is required" : ""}
                            onChange={(event) => this.handlePlayerInformation(event, 4)}
                        />
                        <br/>
                        <TextField
                            floatingLabelText="Rating"
                            errorText={attemptedSubmit && !playerInformation[1].rating ? "This field is required" : ""}
                            onChange={(event) => this.handlePlayerInformation(event, 5)}
                        />
                        <br/>
                        <TextField
                            floatingLabelText="Record"
                            errorText={attemptedSubmit && !playerInformation[1].record ? "This field is required" : ""}
                            onChange={(event) => this.handlePlayerInformation(event, 6)}
                        />
                    </div>
                </div>
                 <RaisedButton className="start-match" label="Start Match" fullWidth={true} primary={true} onClick={this.startMatch}/>
            </div>
        );
    }
};

export default PreMatch;
