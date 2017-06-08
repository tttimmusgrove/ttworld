import React from 'react';

import PlayerInfo from './PlayerInfo';
import Scores from './Scores';

class MatchInformation extends React.Component {
  render() {
    return (
      <div className="match-information">
        <PlayerInfo player={1}/>
        <Scores />
        <PlayerInfo player={2}/>
      </div>
    );
  }
};

export default MatchInformation;
