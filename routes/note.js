const express = require('express');
const router = express.Router();
const protect = require('../middles/authMiddle');
const controllers = require('../controllers/note');

router.post('/note/create', protect, controllers.create);
router.post('/note/read', protect, controllers.read);
router.post('/note/update', protect, controllers.update);
router.post('/note/deletE', protect, controllers.deletE);

module.exports = router;
