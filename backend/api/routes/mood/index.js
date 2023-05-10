const express = require('express');
const MoodController = require('@Controller/mood');

const router = express.Router();

router.get('/', ...MoodController.getAll)
router.post('/', ...MoodController.create)

module.exports = router;
