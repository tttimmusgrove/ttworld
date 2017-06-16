import React from 'react';

import {connect} from 'react-redux';
import {matchActions} from 'actions';

class MatchAnalysis extends React.Component {
  render() {
    return (
      <div className="match-analysis">
        Match Analysis Component
      </div>
    );
  }
};

export default connect(
    (state) => {
        return state;
    }
)(MatchAnalysis);
