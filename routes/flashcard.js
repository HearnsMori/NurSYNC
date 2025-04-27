const express = require('express');
const router = express.Router();
const protect = require('../middles/authMiddle');
const controllers = require('../controllers/flashcard');

router.post('/flashcard/create', protect, controllers.create);
router.post('/flashcard/read', protect, controllers.read);
router.post('/flashcard/update', protect, controllers.update);
router.post('/flashcard/deletE', protect, controllers.deletE);

module.exports = router;
