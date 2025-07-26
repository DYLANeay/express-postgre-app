class UserModel {
  constructor(db) {
    this.db = db;
  }

  async getAllUsers() {
    return await this.db.getAllUsernames();
  }

  async createUser(username) {
    return await this.db.insertUsername(username);
  }

  async getUserById(userId) {
    return await this.db.getUserById(userId);
  }
}

module.exports = UserModel;
