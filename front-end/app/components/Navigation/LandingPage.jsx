import React from 'react';
import {Link} from 'react-router-dom';

import Match from '../Match/Match';

import RaisedButton from 'material-ui/RaisedButton';

class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing-page-container">
        <Link to={"/match"}>
            <RaisedButton label="Start New Match" primary={true} />
        </Link>
      </div>
    );
  }
};

export default LandingPage;
