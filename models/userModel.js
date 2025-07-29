class UserModel {
  constructor(db) {
    this.db = db;
  }

  async getAllUsers() {
    const users = await this.db.getAllUsernames();
    // Ajouter des informations supplémentaires ou transformer les données
    return users.map((user) => ({
      ...user,
      displayName: user.username.toUpperCase(),
      createdAt: new Date(),
    }));
  }

  async deleteUsers() {
    try {
      return await this.db.deleteUsers();
    } catch (error) {
      console.error('Error deleting users:', error);
      throw new Error('Error deleting users');
    }
  }

  async createUser(username) {
    // Valider ou transformer les données avant l'insertion
    const sanitizedUsername = username.trim();
    if (sanitizedUsername.length < 3) {
      throw new Error('Username too short');
    }
    return await this.db.insertUsername(sanitizedUsername);
  }

  async getUserById(userId) {
    const user = await this.db.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

module.exports = UserModel;
