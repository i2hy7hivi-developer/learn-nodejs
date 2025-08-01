const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/login', AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/register', AuthController.register);

module.exports = router;
