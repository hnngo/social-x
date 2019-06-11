const acLog = require('../utils/activityLog');
const _ = require('lodash');
const User = require('../models/User');

module.exports = (server) => {
  // Setup socket io
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
      let socketIndex = _.findIndex(connections, (c) => c.socket === socket);
      connections.splice(socketIndex, 1);
      acLog(`Connections: ${connections.length}`);
    });

    // Setup the change
    User.watch().on('change', change => {
      // Care about User change only
      if (change.ns.coll !== "users") {
        return;
      }

      const userId = change.documentKey._id.toString();
      let socketIndex = _.findIndex(connections, (c) => c.socket === socket);

      if (socketIndex >= 0 && connections[socketIndex].auth === userId) {
        socket.emit('change', "reload");
      }
    });
  })
}
