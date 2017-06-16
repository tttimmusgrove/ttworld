import React from 'react';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';

import CoinFlip from './CoinFlip';

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
            attemptedSubmit: false,
            server: 1,
            coinFlip: false,
            proMenuPlayer: false,
            proMenuOpponent: false
        }

        this.handleMatchTypeChange = this.handleMatchTypeChange.bind(this);
        this.handlePlayerInformation = this.handlePlayerInformation.bind(this);
        this.startMatch = this.startMatch.bind(this);
        this.setServer = this.setServer.bind(this);
        this.setServerCoin = this.setServerCoin.bind(this);
        this.toggleCoinFlip = this.toggleCoinFlip.bind(this);
        this.quickStart = this.quickStart.bind(this);
        this.handleOpenProMenuPlayer = this.handleOpenProMenuPlayer.bind(this);
        this.handlePlayerProChange = this.handlePlayerProChange.bind(this);
        this.handleOpenProMenuOpponent = this.handleOpenProMenuOpponent.bind(this);
        this.handleOpponentProChange = this.handleOpponentProChange.bind(this);
        this.addProPlayer = this.addProPlayer.bind(this);
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
        var server = this.state.server;

        if(playerInformation[0].name && playerInformation[0].rating && playerInformation[0].record && playerInformation[1].name && playerInformation[1].rating && playerInformation[1].record && (server == 1 || server == 2)) {
            this.props.startMatch(playerInformation, server)
        } else {
            this.setState({
                attemptedSubmit: true
            })
        }
    }
    setServer(event, isInputChecked, player) {
        if(isInputChecked) {
            this.setState({
                server: player
            })
        } else {
            this.setState({
                server: 0
            })
        }
    }
    setServerCoin(player) {
        this.setState({
            server: player
        })
    }
    toggleCoinFlip() {
        this.setState({
            coinFlip: !this.state.coinFlip
        })
    }
    quickStart() {
        var playerInformation = this.state.playerInformation;
        var server = this.state.server;

        playerInformation[0].name = "Guest Player";
        playerInformation[0].rating = "Unrated";
        playerInformation[0].record = "0-0";
        playerInformation[1].name = "Opponent";
        playerInformation[1].rating = "Unrated";
        playerInformation[1].record = "0-0";

        this.setState({
            playerInformation: playerInformation
        })

        setTimeout(() => {
            this.props.startMatch(playerInformation, server);
        }, 500)
    }
    handleOpenProMenuPlayer() {
        this.setState({
            proMenuPlayer: true
        })
    }
    handlePlayerProChange(value) {
        this.setState({
            proMenuPlayer: value
        })
    }
    handleOpenProMenuOpponent() {
        this.setState({
            proMenuOpponent: true
        })
    }
    handleOpponentProChange(value) {
        this.setState({
            proMenuOpponent: value
        })
    }
    addProPlayer(player, pro) {
        var playerInformation = this.state.playerInformation;

        if(pro == 1) {
            playerInformation[player-1].name = "Ma Long";
            playerInformation[player-1].rating = "3437";
            playerInformation[player-1].record = "7-player (Jun)";
        } else if (pro == 2) {
            playerInformation[player-1].name = "Fan Zhendong";
            playerInformation[player-1].rating = "3346";
            playerInformation[player-1].record = "6-1 (Jun)";
        } else if (pro == 3) {
            playerInformation[player-1].name = "Xu Xin";
            playerInformation[player-1].rating = "3129";
            playerInformation[player-1].record = "5-1 (Jun)";
        } else if (pro == 4) {
            playerInformation[player-1].name = "Zhang Jike";
            playerInformation[player-1].rating = "2953";
            playerInformation[player-1].record = "2-1 (Jun)";
        }

        this.setState({
            playerInformation: playerInformation
        })
    }
    render() {
        var {matchType, playerInformation, attemptedSubmit, server, coinFlip, proMenuPlayer, proMenuOpponent} = this.state;

        const coinFlipActions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.toggleCoinFlip}
            />
        ]

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
                    <RaisedButton label="Quick Start" onTouchTap={this.quickStart} primary={true} className="quick-start-button" />
                </div>
                <hr />
                <div className="pre-match-players-information">
                    <div className="pre-match-player-information">
                        <h2 className="pre-match-player-information-header">Player Information</h2>
                        <TextField
                            floatingLabelText="Name"
                            errorText={attemptedSubmit && !playerInformation[0].name ? "This field is required" : ""}
                            onChange={(event) => this.handlePlayerInformation(event, 1)}
                            value={playerInformation[0].name ? playerInformation[0].name : ""}
                        />
                        <br/>
                        <TextField
                            floatingLabelText="Rating"
                            errorText={attemptedSubmit && !playerInformation[0].rating ? "This field is required" : ""}
                            onChange={(event) => this.handlePlayerInformation(event, 2)}
                            value={playerInformation[0].rating ? playerInformation[0].rating : ""}
                        />
                        <br/>
                        <TextField
                            floatingLabelText="Record"
                            errorText={attemptedSubmit && !playerInformation[0].record ? "This field is required" : ""}
                            onChange={(event) => this.handlePlayerInformation(event, 3)}
                            value={playerInformation[0].record ? playerInformation[0].record : ""}
                        />
                        <Checkbox
                          label="Initial Server"
                          onCheck={(event, isInputChecked) => this.setServer(event, isInputChecked, 1)}
                          disabled={server == 2 ? true : false}
                          checked={server == 1 ? true : false}
                        />
                        <RaisedButton label="Flip A Coin" onTouchTap={this.toggleCoinFlip} primary={true} className="flip-for-server" />
                        <IconMenu
                          iconButtonElement={<RaisedButton onTouchTap={this.handleOpenProMenuPlayer} label="Play As a Pro" />}
                          open={proMenuPlayer}
                          onRequestChange={this.handlePlayerProChange}
                        >
                          <MenuItem value="1" primaryText="Ma Long" onClick={() => this.addProPlayer(1, 1)} />
                          <MenuItem value="2" primaryText="Fan Zhendong" onClick={() => this.addProPlayer(1, 2)} />
                          <MenuItem value="3" primaryText="Xu Xin" onClick={() => this.addProPlayer(1, 3)} />
                          <MenuItem value="4" primaryText="Zhang Jike" onClick={() => this.addProPlayer(1, 4)} />
                        </IconMenu>
                    </div>
                    <div className="pre-match-opponent-information">
                        <h2 className="pre-match-opponent-information-header">Opponent Information</h2>
                        <TextField
                            floatingLabelText="Name"
                            errorText={attemptedSubmit && !playerInformation[1].name ? "This field is required" : ""}
                            onChange={(event) => this.handlePlayerInformation(event, 4)}
                            value={playerInformation[1].name ? playerInformation[1].name : ""}
                        />
                        <br/>
                        <TextField
                            floatingLabelText="Rating"
                            errorText={attemptedSubmit && !playerInformation[1].rating ? "This field is required" : ""}
                            onChange={(event) => this.handlePlayerInformation(event, 5)}
                            value={playerInformation[1].rating ? playerInformation[1].rating : ""}
                        />
                        <br/>
                        <TextField
                            floatingLabelText="Record"
                            errorText={attemptedSubmit && !playerInformation[1].record ? "This field is required" : ""}
                            onChange={(event) => this.handlePlayerInformation(event, 6)}
                            value={playerInformation[1].record ? playerInformation[1].record : ""}
                        />
                        <Checkbox
                          label="Initial Server"
                          onCheck={(event, isInputChecked) => this.setServer(event, isInputChecked, 2)}
                          disabled={server == 1 ? true : false}
                          checked={server == 2 ? true : false}
                        />
                        <IconMenu
                          iconButtonElement={<RaisedButton onTouchTap={this.handleOpenProMenuOpponent} label="Play Against a Pro" />}
                          open={proMenuOpponent}
                          onRequestChange={this.handleOpponentProChange}
                        >
                          <MenuItem value="1" primaryText="Ma Long" onClick={() => this.addProPlayer(2, 1)} />
                          <MenuItem value="2" primaryText="Fan Zhendong" onClick={() => this.addProPlayer(2, 2)} />
                          <MenuItem value="3" primaryText="Xu Xin" onClick={() => this.addProPlayer(2, 3)} />
                          <MenuItem value="4" primaryText="Zhang Jike" onClick={() => this.addProPlayer(2, 4)} />
                        </IconMenu>
                    </div>
                </div>
                 <RaisedButton className="start-match" label="Start Match" fullWidth={true} primary={true} onClick={this.startMatch}/>
                 <Dialog
                   actions={coinFlipActions}
                   open={coinFlip}
                   onRequestClose={this.toggleCoinFlip}
                   style={{height: '30%'}}
                 >
                   <CoinFlip server={server} setServer={this.setServerCoin} />
                 </Dialog>
            </div>
        );
    }
};

export default PreMatch;
