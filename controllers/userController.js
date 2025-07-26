const path = require('path');
const db = require('../db/queries');
const { body, validationResult } = require('express-validator');

const validateUser = [
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .matches(/^[A-Za-z\s]+$/) // Allow letters and spaces
    .withMessage('Username must contain only letters and spaces'),
];

async function AllUsersGet(req, res) {
  try {
    const users = await db.getAllUsernames();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
}

function showForm(req, res) {
  res.sendFile(path.join(__dirname, '../views/userForm.html'));
}

const createUserPost = [
  validateUser,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { username } = req.body;
      await db.insertUsername(username);
      res.redirect('/');
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Error creating user' });
    }
  },
];

// Removed getUserById as it's not implemented in the database yet

module.exports = {
  AllUsersGet,
  showForm,
  createUserPost,
};
