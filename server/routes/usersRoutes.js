const express = require('express');
const router = express.Router();


const usersController = require('../controllers/usersController');


router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/logout/:id', usersController.logout);


module.exports = router;