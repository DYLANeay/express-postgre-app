const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.AllUsersGet);
router.get('/new', userController.showForm);
router.post('/new', userController.createUserPost);

module.exports = router;
