
const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize');
const connection = require('../config/database')

const User = connection.define("users",
  {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.VIRTUAL,
    password_hash: Sequelize.STRING,
  },
)

User.addHook('beforeSave', async user => {
  if (user.password) {
    user.password_hash = await bcrypt.hash(user.password, 8);
  }
  return user
});

module.exports = User;