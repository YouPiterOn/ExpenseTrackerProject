const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('./mongooseConnection');
const routes = require('./routes');

const { setOnline, setOffline } = require('./handlers/userHandlers');

function originFunction(origin, callback) {
    callback(null, true);
}

const corsOptions = {
    origin: originFunction,
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', 'views');

mongoose.set('strictQuery', false);

const port = 4000;

app.use('/', routes.expenseRoutes);
app.use('/user', routes.userRoutes);

const server = http.createServer(app);

const io = socketIo(server);

io.on('connection', (socket) => {
    
    let localUsername;

    socket.on('login', (username) => {
        localUsername = username;
        setOnline(localUsername);
        console.log('A user connected '+localUsername);
        io.emit('userStatus', { username: localUsername, online: true });
    });
    
    socket.on('disconnect', () => {
        setOffline(localUsername);
        io.emit('userStatus', { username: localUsername, online: false });
    });
});

server.listen(port, () => {
    
})