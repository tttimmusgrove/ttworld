//Root javascript file of the application
//Renders the Root component using reactDOM
//Set up for react hot loader

import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import Root from './components/Navigation/Root';

//App scss import
require('style-loader!css-loader!sass-loader!applicationStyles');

//Base function of applcation, renders Root component using ReactDOM
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  );
};

render(Root);

//React hot loader logic
if (module.hot) {
   module.hot.accept('./components/Navigation/Root.jsx', () => {
     const NextRootContainer = require('./components/Navigation/Root').default;
     render(NextRootContainer);
   })
}
