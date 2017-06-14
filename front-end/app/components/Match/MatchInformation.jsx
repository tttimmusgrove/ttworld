import React from 'react';

import PlayerInfo from './PlayerInfo';
import Scores from './Scores';

class MatchInformation extends React.Component {
  render() {
    var {server, scores, playerInformation} = this.props;

    return (
      <div className="match-information">
        <PlayerInfo player={1} playerInformation={playerInformation[0]} />
        <Scores server={server} scores={scores} playerInformation={playerInformation} />
        <PlayerInfo player={2} playerInformation={playerInformation[1]} />
      </div>
    );
  }
};

export default MatchInformation;
