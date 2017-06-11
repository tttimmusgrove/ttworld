import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';

class GameAnalysis extends React.Component {
  render() {
    return (
      <div className="game-analysis">
          Game Analysis Component
          <RaisedButton className="next-game-button" label="Start Next Game" primary={true} onClick={this.props.nextGame} />
      </div>
    );
  }
};

export default GameAnalysis;
