const express = require("express");

const lessonsRouter = require('../routes/lessons.routes');
const messagesRouter = require('../routes/messages.routes');

const Lessons = require("../models/dbHelpers");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "randooommm" });
});

server.use('/api/lessons', lessonsRouter);
server.use('/api/messages', messagesRouter);

module.exports = server;