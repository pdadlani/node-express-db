const express = require('express');
const Lessons = require('./models/dbHelpers');

const server = express();

server.use(express.json());

const PORT = 5001;

server.get('/', (req, res) => {
  res.json({ message: "randooommm"});
});

server.post('/api/lessons', (req, res) => {
  Lessons.add(req.body)
    .then(lesson => {
      res.status(200).json(lesson);
    })
    .catch(error => {
      res.status(500).json({ message: "Cannot add lesson"});
    });
});

server.get('/api/lessons', (req, res) => {
  Lessons.find()
    .then(lessons => {
      res.status(200).json(lessons);
    })
    .catch(error => {
      res.status(500).json({ message: "unable to retrieve lessons."})
    })
})

server.listen(PORT, () => {
  console.log(`\n*** Server running on port ${PORT} ***\n`);
});

