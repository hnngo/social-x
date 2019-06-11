const acLog = require('../utils/activityLog');
const _ = require('lodash');

module.exports = (server) => {
  const io = require('socket.io').listen(server);

  /*
    Cnnections: [
      {
        socket: socket,
        auth: null / userId
      }
    ]
  */
  const connections = [];
  io.sockets.on('connection', (socket) => {
    // Create new socket information
    const newConnection = {
      socket,
      auth: null
    }

    // Add to connection array
    connections.push(newConnection);
    acLog(`Connections: ${connections.length}`);

    // Listen to activities
    socket.on('signIn', (user) => {
      if (!user) { return; }

      let socketIndex = _.findIndex(connections, (c) => c.socket === socket);
      connections[socketIndex].auth = user;
    });

    socket.on('signOut', () => {
      let socketIndex = _.findIndex(connections, (c) => c.socket === socket);
      connections[socketIndex].auth = null;
    });

    socket.on('disconnect', () => {
      connections.splice(connections.indexOf(socket), 1);
      acLog(`Connections: ${connections.length}`);
    })
  })
}
