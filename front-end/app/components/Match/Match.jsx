import React from 'react';

import {connect} from 'react-redux';
import {matchActions} from 'actions';

import MatchInformation from './MatchInformation';
import Navigation from './Navigation';
import Questions from './Questions';
import Notes from './Notes';

class Match extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }
    render() {
        return (
            <div className="match">
                <MatchInformation />
                <Navigation />
                <Questions />
                <Notes />
            </div>
        );
    }
};

export default connect(
    (state) => {
        return state;
    }
)(Match);
