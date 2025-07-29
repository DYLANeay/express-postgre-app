const pool = require('./pool');

async function getAllUsernames() {
  const { rows } = await pool.query('SELECT * FROM usernames');
  return rows;
}

async function deleteUsers() {
  const query = 'DELETE FROM usernames';
  await pool.query(query);
  return { message: 'All users deleted successfully' };
}

async function insertUsername(username) {
  // This syntax is is used to prevent SQL injection
  await pool.query('INSERT INTO usernames (username) VALUES ($1)', [username]);
}

module.exports = {
  getAllUsernames,
  insertUsername,
  deleteUsers,
};
