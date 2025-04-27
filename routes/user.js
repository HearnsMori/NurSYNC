const express = require('express');
const router = express.Router();
const protect = require('../middles/authMiddle');
const controllers = require('../controllers/user');

router.post('/user/create', protect, controllers.create);
router.post('/user/read', protect, controllers.read);
router.post('/user/update', protect, controllers.update);
router.post('/user/deletE', protect, controllers.deletE);

module.exports = router;
