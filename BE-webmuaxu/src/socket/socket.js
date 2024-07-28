const socketIo = require('socket.io');

const setupSocket = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: '*', // Adjust to only allow specific domains
            methods: ['GET', 'POST'] // Adjust to only allow specific methods
        }
    });

    io.on('connection', (socket) => {
        console.log('Client connected');

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    return io;
};

module.exports = setupSocket;