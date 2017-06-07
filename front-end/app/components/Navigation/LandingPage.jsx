import React from 'react';
import {Link} from 'react-router-dom';

import Match from '../Match/Match';

class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing-page-container">
        <Link to={"/match"}><div>Start New Match</div></Link>
      </div>
    );
  }
};

export default LandingPage;
