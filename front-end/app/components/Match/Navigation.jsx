import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';

import {Link} from 'react-router-dom';

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameSettingsOpen: false,
            resetMatchDialog: false,
            endMatchDialog: false
        }

        this.toggleGameSettings = this.toggleGameSettings.bind(this);
        this.toggleResetMatchDialog = this.toggleResetMatchDialog.bind(this);
        this.toggleEndMatchDialog = this.toggleEndMatchDialog.bind(this);
        this.handleQuestionComplexityChange = this.handleQuestionComplexityChange.bind(this);
        this.changeGamesToWin = this.changeGamesToWin.bind(this);
        this.resetMatch = this.resetMatch.bind(this);
    }
    toggleGameSettings() {
        this.setState({
            gameSettingsOpen: !this.state.gameSettingsOpen
        })
    }
    toggleResetMatchDialog() {
        this.setState({
            resetMatchDialog: !this.state.resetMatchDialog
        })
    }
    toggleEndMatchDialog() {
        this.setState({
            endMatchDialog: !this.state.endMatchDialog
        })
    }
    handleQuestionComplexityChange(event, index, value) {
        this.props.changeQuestionComplexity(value);
    }
    changeGamesToWin(event, index, value) {
        this.props.changeGamesToWin(value);
    }
    resetMatch() {
        this.props.resetMatch();
        this.setState({
            resetMatchDialog: false
        })
    }
    render() {
        var {gameSettingsOpen, resetMatchDialog, endMatchDialog} = this.state;
        var {questionComplexity, gamesToWin} = this.props;

        const gameSettingsActions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.toggleGameSettings}
            />
        ]

        const resetMatchActions = [
            <FlatButton
                label="Submit"
                primary={true}
                onTouchTap={this.resetMatch}
            />,
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.toggleResetMatchDialog}
            />
        ]

        const endMatchActions = [
            <Link to={"/"}>
                <FlatButton
                    label="Submit"
                    primary={true}
                />
            </Link>,
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.toggleEndMatchDialog}
            />
        ]

        return (
            <div className="navigation">
                <IconMenu
                  iconButtonElement={<IconButton style={{width: '100%'}}><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  style={{width: '100%'}}
                >
                    <MenuItem primaryText="Game Settings" onClick={this.toggleGameSettings} />
                    <MenuItem primaryText="Restart Match" onClick={this.toggleResetMatchDialog} />
                    <MenuItem primaryText="End Match" onClick={this.toggleEndMatchDialog} />
                </IconMenu>
                <Dialog
                  title="Game Settings"
                  actions={gameSettingsActions}
                  open={gameSettingsOpen}
                  onRequestClose={this.toggleGameSettings}
                >
                    <SelectField
                      floatingLabelText="Question Complexity"
                      value={questionComplexity}
                      onChange={this.handleQuestionComplexityChange}
                    >
                      <MenuItem value={1} primaryText="All Questions" />
                      <MenuItem value={2} primaryText="Simple Analysis" />
                      <MenuItem value={3} primaryText="No Analysis" />
                    </SelectField>
                    <SelectField
                      floatingLabelText="Games Per Match"
                      value={gamesToWin}
                      onChange={this.changeGamesToWin}
                    >
                      <MenuItem value={3} primaryText="Best of 5" />
                      <MenuItem value={4} primaryText="Best of 7" />
                    </SelectField>
                </Dialog>
                <Dialog
                  title="Reset Match?"
                  actions={resetMatchActions}
                  open={resetMatchDialog}
                  onRequestClose={this.toggleResetMatchDialog}
                >
                </Dialog>
                <Dialog
                  title="End Match?"
                  actions={endMatchActions}
                  open={endMatchDialog}
                  onRequestClose={this.toggleEndMatchDialog}
                >
                </Dialog>
            </div>
        );
    }
};

export default Navigation;
