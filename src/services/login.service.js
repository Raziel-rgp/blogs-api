const { User } = require('../models/User');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  return user;
};

module.exports = {
  login,
};
