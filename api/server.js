const express = require('express');
const expressRouter = require('../expressRouter');
const server = express();
const cors = require('cors');

server.use(express.json());
server.use(cors());
server.use("/api/posts", expressRouter);
server.get("/", (req, res) => {
    res.send("SUCCESS")
})


module.exports = server;
