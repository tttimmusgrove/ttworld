import React from 'react';

import Avatar from 'material-ui/Avatar';

import person1 from '../../../content/person1.png';
import person2 from '../../../content/person2.jpg';

class PlayerInfo extends React.Component {
  render() {
    var {player} = this.props;

    var classNames = "player-information ";
    classNames += player == 1 ? "player1" : "player2"

    const renderPlayerInfo = () => {
        return (
            <div className="player-data">
                <h2 className="player-name">{player == 1 ? "Player 1" : "Player 2"}</h2>
                <h3 className="player-rating">{player == 1 ? "1950" : "2000"}</h3>
                <h4 className="player-record">{player == 1 ? "0-1" : "2-1"}</h4>
            </div>
        )
    }

    return (
      <div className={classNames}>
          {player == 2 ? renderPlayerInfo() : ""}
          <Avatar
            src={player == 1 ? person1 : person2}
            size={150}
            style={{
                display: 'inline-block'
            }}
          />
          {player == 1 ? renderPlayerInfo() : ""}
      </div>
    );
  }
};

export default PlayerInfo;
