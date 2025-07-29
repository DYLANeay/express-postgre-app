const path = require('path');
const UserModel = require('../models/userModel');
const db = require('../db/queries');
const { body, validationResult } = require('express-validator');

// Créer une instance du modèle
const userModel = new UserModel(db);

const validateUser = [
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .matches(/^[A-Za-z\s]+$/) // Allow letters and spaces
    .withMessage('Username must contain only letters and spaces'),
];

async function AllUsersGet(req, res) {
  try {
    const users = await userModel.getAllUsers(); // Utiliser le modèle au lieu de db directement
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
}

function showForm(req, res) {
  res.sendFile(path.join(__dirname, '../views/userForm.html'));
}

async function deleteUsersGet(req, res) {
  // Logique pour supprimer un utilisateur
  try {
    await userModel.deleteUsers();
    res.json({ message: 'Users deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Error deleting user' });
  }
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
      await userModel.createUser(username); // Utiliser le modèle au lieu de db directement
      res.redirect('/');
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Error creating user' });
    }
  },
];

module.exports = {
  AllUsersGet,
  showForm,
  createUserPost,
  deleteUsersGet,
};
