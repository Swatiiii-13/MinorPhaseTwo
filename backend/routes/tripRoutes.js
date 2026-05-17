const express = require('express');
const router = express.Router();
const { generateItinerary } = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate', protect, generateItinerary);

module.exports = router;
