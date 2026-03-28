const express = require('express');
const router = express.Router();
const { getMemes, saveMeme, deleteMeme } = require('../controllers/memeController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getMemes).post(protect, saveMeme);
router.route('/:id').delete(protect, deleteMeme);

module.exports = router;
