const express = require("express");
const Lessons = require("../models/dbHelpers");

const router = express.Router();

// for all routes starting with /api/lessons
router.post("/", (req, res) => {
  Lessons.add(req.body)
    .then((lesson) => {
      res.status(200).json(lesson);
    })
    .catch((error) => {
      res.status(500).json({ message: "Cannot add lesson" });
    });
});

router.get("/", (req, res) => {
  Lessons.find()
    .then((lessons) => {
      res.status(200).json(lessons);
    })
    .catch((error) => {
      res.status(500).json({ message: "unable to retrieve lessons." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Lessons.findById(id)
    .then((lesson) => {
      if (lesson) {
        res.status(200).json(lesson);
      } else {
        res.status(404).json({ message: "record not found." });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "unable to perform operation" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Lessons.remove(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "Successfully deleted." });
      } else {
        res.status(404).json({ message: "Unable to locate record." });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Unable to delete lesson." });
    });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Lessons.update(id, changes)
    .then((lesson) => {
      if (lesson) {
        res.status(200).json(lesson);
      } else {
        res.status(404).json({ message: "Lesson not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error updating lesson." });
    });
});

router.post("/:id/messages", (req, res) => {
  const { id } = req.params;
  const msg = req.body;

  if (!msg.lesson_id) {
    msg["lesson_id"] = parseInt(id, 10);
  }

  Lessons.findById(id)
    .then((lesson) => {
      if (!lesson) {
        res.status(404).json({ message: "invalid id for lesson." });
      }
      // check for all required fields
      if (!msg.sender || !msg.text) {
        res
          .status(400)
          .json({ message: "Must provide both sender and text values." });
      }
      // if all the above checks pass, then we can add our message
      Lessons.addMessage(msg, id)
        .then((message) => {
          if (message) {
            res.status(200).json(message);
          }
        })
        .catch((error) => {
          res.status(500).json({ message: "Failed to add message." });
        });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error finding lesson with given id." });
    });
});

router.get("/:id/messages", (req, res) => {
  const { id } = req.params;

  Lessons.findAllLessonMessages(id)
    .then((lessons) => {
      res.status(200).json(lessons);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving message." });
    });
});

module.exports = router;