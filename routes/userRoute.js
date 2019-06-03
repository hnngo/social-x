const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/profile/:userId', profileController.getUserProfile)

module.exports = router;
