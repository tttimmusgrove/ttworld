import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

var store = require('configureStore').configure();

// store.subscribe(() => {
//   console.log(store.getState());
// })

import LandingPage from './LandingPage';
import MatchPage from '../Match/MatchPage';

const Root = () => {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Route
                        exact
                        path="/"
                        component={LandingPage}
                    />
                    <Route
                        exact
                        path="/match"
                        component={MatchPage}
                    />
                </div>
            </Router>
        </Provider>
    )
};

export default Root;
