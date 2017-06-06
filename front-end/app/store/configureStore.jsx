//Configures Redux store used to manage react component state
//Exports configuration function, which allows Root component to configure the store

var redux = require('redux');
var thunk = require('redux-thunk').default;
var {mainReducer} = require('../reducers/index');
var io = require('../../node_modules/socket.io-client/dist/socket.io');

//Connecting to API server via websockets
var backend_domain = "http://localhost:3000";
const socket = io.connect(backend_domain);

socket.on('connect', () => {
});

//Initial websocket client ping to check connectivity
socket.emit('check', 'ping from client', (response) => {
  console.log('WEBSOCKET: ', response);
});

socket.on('announcement', (data) => {
});

//Websocket middleware used to emit actions to the server when redux actions are called
const socketMiddleware = ({ getState }) => {
  return next => action => {
    let result = next(action);

    return result;
  }
};

//Configuration function exported and used by Root component
export var configure = (initialState = {}) => {
  //Creates main reducer using the various reducer files
  // var reducer = redux.combineReducers({
  //   main: mainReducer
  // });
  //
  // //Creates the redux store using the main reducer and applies thunk and websocket middleware
  // var store = redux.createStore(reducer, initialState, redux.compose(
  //   redux.applyMiddleware(thunk, socketMiddleware),
  //   window.devToolsExtension ? window.devToolsExtension() : f => f
  // ));
  //
  // return store;
};
