const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.AllUsersGet);
router.get('/new', userController.showForm);
router.post('/new', userController.createUserPost);
router.get('/:id', userController.getUsersById);

module.exports = router;
