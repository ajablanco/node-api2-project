const express = require('express');
const expressRouter = require('../expressRouter');
const server = express();

server.use(express.json());
server.use("/api/posts", expressRouter);
server.get("/", (req, res) => {
    res.send("SUCCESS")
})


module.exports = server;
