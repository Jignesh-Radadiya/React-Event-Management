const express = require('express');
const router = express.Router();
const userController = require('../Controllers/usercontroller');

router.post('/register', userController.registerUser);

module.exports = router;
