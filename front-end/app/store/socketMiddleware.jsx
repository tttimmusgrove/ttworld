import io from 'socket.io-client';
var domain_name = "http://localhost:3000"
const socket = io.connect(domain_name);

socket.on('connect', function() {
});


export function socketMiddleware({ getState }) {
  return next => action => {
    let result = next(action);

    return result;
  };
};
