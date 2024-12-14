const express = require("express");
// const IOServer = require("socket.io").Server();
const http = require("http");
const cors = require("cors");
const { AppRouter } = require("./router");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { app, server, io } = require("./lib/socket");

dotenv.config();
// const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
}));
app.use(bodyParser({ urlencoded: true }));
app.use("/api", new AppRouter());

app.use("*", (req, res, next) => {
    return res.status(404).json({
        message: "failure",
        error: "Resource not found",
    });
});
server.listen(PORT, () => {
    console.log(`Application connected and listening on port ${PORT}`);
});