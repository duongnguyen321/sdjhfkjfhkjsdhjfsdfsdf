const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const port = 3000;
const connectDB = require('./src/mongo/mongo');
const setupSocket = require('./src/socket/socket');
const routes = require('./src/router/index');

// Middleware để xử lý JSON
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = setupSocket(server);

app.use((req, res, next) => {
    req.io = io;
    next();
});

connectDB()

app.use('/', routes);

// Khởi động server
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});