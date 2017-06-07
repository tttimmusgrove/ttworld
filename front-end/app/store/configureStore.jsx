//Configures Redux store used to manage react component state
//Exports configuration function, which allows Root component to configure the store

var redux = require('redux');
var thunk = require('redux-thunk').default;
var {matchReducer} = require('../reducers/index');

//Configuration function exported and used by Root component
export var configure = (initialState = {}) => {
  //Creates main reducer using the various reducer files
  var reducer = redux.combineReducers({
    match: matchReducer
  });

  //Creates the redux store using the main reducer and applies thunk and websocket middleware
  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
