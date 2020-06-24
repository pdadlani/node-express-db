const express = require('express');
const Lessons = require('../models/dbHelpers');

const router = express.Router();

// for all routes starting with /api/messages
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Lessons.removeMessage(id)
    .then((count) => {
      if (count > 0) {
        res
          .status(200)
          .json({ message: `Message with id ${id} successfully deleted.` });
      } else {
        res
          .status(404)
          .json({ message: `Unable to locate message with id ${id}.` });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error deleting message." });
    });
});

module.exports = router;