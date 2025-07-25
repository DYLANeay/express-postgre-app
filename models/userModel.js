class UserModel {
  constructor() {
    this.users = []; // Temporary storage until database is implemented
  }

  getAllUsers() {
    return this.users;
  }

  createUser(username) {
    const user = {
      id: this.users.length + 1,
      username,
    };
    this.users.push(user);
    return user;
  }

  getUserById(userId) {
    return this.users.find((user) => user.id === parseInt(userId));
  }
}

module.exports = UserModel;
