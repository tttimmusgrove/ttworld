import React from 'react';

import PlayerInfo from './PlayerInfo';
import Scores from './Scores';

class MatchInformation extends React.Component {
  render() {
    return (
      <div className="match-information">
        Match Information
        <PlayerInfo />
        <Scores />
        <PlayerInfo />
      </div>
    );
  }
};

export default MatchInformation;
