const express = require('express');
const router = express.Router();
const protect = require('../middles/authMiddle');
const controllers = require('../controllers/auth');

router.post('/auth/login', controllers.login);
router.post('/auth/signup', controllers.signup);
router.post('/auth/recover', controllers.recover);
router.post('/auth/verify', controllers.verify);

module.exports = router;
