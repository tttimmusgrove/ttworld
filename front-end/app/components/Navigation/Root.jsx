import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

var store = require('configureStore').configure();

// store.subscribe(() => {
//   console.log(store.getState());
// })

import LandingPage from './LandingPage';
import MatchPage from '../Match/MatchPage';
import MatchAnalysis from '../MatchAnalysis/MatchAnalysis';

const Root = () => {
    return (
        <Provider store={store}>
            <MuiThemeProvider>
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
                        <Route
                            exact
                            path="/matchAnalysis"
                            component={MatchAnalysis}
                        />
                    </div>
                </Router>
            </MuiThemeProvider>
        </Provider>
    )
};

export default Root;
