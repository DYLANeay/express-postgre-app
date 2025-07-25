const path = require('path');
const UserModel = require('../models/userModel'); // Fixed space in path
const { body, validationResult } = require('express-validator');

const userModel = new UserModel();

const lengthErr = 'Username must be at least 3 characters long';
const alphaErr = 'Username must contain only alphabetic characters';

const validateUser = [
  body('username')
    .isLength({ min: 3 })
    .withMessage(lengthErr)
    .isAlpha()
    .withMessage(alphaErr),
];

exports.AllUsersGet = (req, res) => {
  const users = userModel.getAllUsers();
  res.send(users);
};

exports.getUsersById = (req, res) => {
  const userId = req.params.id;
  const user = userModel.getUserById(userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
};

exports.createUserPost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username } = req.body;
    userModel.createUser(username);
    res.redirect('/'); // This will redirect to the root route where index.html is served
  },
];

exports.showForm = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/userForm.html')); // Changed render to sendFile
};
