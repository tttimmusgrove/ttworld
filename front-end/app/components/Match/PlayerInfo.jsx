import React from 'react';

import Avatar from 'material-ui/Avatar';

import person1 from '../../../content/ma-long.jpg';
import person2 from '../../../content/fan-zhendong.jpg';

class PlayerInfo extends React.Component {
    render() {
        var {player, playerInformation} = this.props;

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
                    <h2 className="player-name">{playerInformation.name}</h2>
                </div>
            </div>
        );
    }
};

export default PlayerInfo;
