import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Navigation extends React.Component {
  render() {
    return (
      <div className="navigation">
        <IconMenu
          iconButtonElement={<IconButton style={{width: '100%'}}><MoreVertIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          style={{width: '100%'}}
        >
          <MenuItem primaryText="Refresh" />
          <MenuItem primaryText="Send feedback" />
          <MenuItem primaryText="Settings" />
          <MenuItem primaryText="Help" />
          <MenuItem primaryText="Sign out" />
        </IconMenu>
        <FlatButton label="Restart Match" primary={true} style={{
            width: '100%'
        }}/>
        <FlatButton label="End Match" secondary={true} style={{
            width: '100%'
        }}/>
      </div>
    );
  }
};

export default Navigation;
