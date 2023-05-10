const express = require('express');
const AuthRoutes = require('@Router/auth');
const MoodRoutes = require('@Router/mood');

const router = express.Router();

router.use('/auth', AuthRoutes);
router.use('/mood', MoodRoutes);

module.exports = router;
