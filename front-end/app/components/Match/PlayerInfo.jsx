import React from 'react';

import Avatar from 'material-ui/Avatar';

import person1 from '../../../content/person1.png';
import person2 from '../../../content/person2.jpg';

class PlayerInfo extends React.Component {
  render() {
    var {player} = this.props;

    var classNames = "player-information ";
    classNames += player == 1 ? "player1" : "player2"

    return (
      <div className={classNames}>
          <div className="player-identity">
              <Avatar
                  src={player == 1 ? person1 : person2}
                  style={{
                      width: '100%',
                      height: '100%'
                  }}
              />
              <h2 className="player-name">{player == 1 ? "Player 1" : "Player 2"}</h2>
          </div>
      </div>
    );
  }
};

export default PlayerInfo;
