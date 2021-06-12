const path = require('path');
const express = require("express");
const http = require('http');
const socket_io = require('socket.io');
const formatMessages = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');
const users = require('./model/chat_model');
const dbconnection = require("./configdb/configdb");



const app = express();
const server = http.createServer(app);
const io = socket_io(server);
const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));
var botName = "WeChat Bot"

io.on("connection", socket => {
    socket.on("joiningRoom", ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
        // welcoming the new user
        socket.emit('message', formatMessages(botName, "Welcome to Wechat!"));
        // Broadcast when new user connects
        socket.broadcast.to(user.room).emit('message', formatMessages(botName, `${user.username} has joined the chat`));
        // send rooms and users info to update sidebar
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });

    });




    // Listening for the message 
    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit("message", formatMessages(user.username, msg));
    });

    socket.on("disconnect", () => {

        const user = userLeave(socket.id);
        if (user) {
            io.to(user.room).emit("message", formatMessages(botName, `${user.username} has left the chat`));

            // send rooms and users info to update sidebar
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }

    });
});


server.listen(port, () => {
    console.log(`Server is listening at http: //localhost:port`)
});