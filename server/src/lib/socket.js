const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_ORIGIN]
    }
});

const connectedUsers = {};
const GetOnlineUserSocketId = (receiverId) => {
    return connectedUsers[receiverId];
};

io.on("connection", (socket) => {
    console.log(`A user connected ${socket.id}`);

    // get userId from socket metadata and insert into connected users map then emit connectionEvent
    const userId = socket.handshake.query.userId;
    connectedUsers[userId] = socket.id;
    io.emit("connectionEvent", Object.keys(connectedUsers));

    socket.on("disconnect", () => {
        console.log(`A user disconnected ${socket.id}`);

        // remove user id from map of connected users and emit connectionEvent
        delete connectedUsers[userId];
        io.emit("connectionEvent", Object.keys(connectedUsers));
    });
});

module.exports = {
    io, app, server, GetOnlineUserSocketId
};