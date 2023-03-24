const { User } = require('../models');

const userRegister = async (displayName, email, password, image) => {
  const result = await User.create({ displayName, email, password, image });
  return result;
};

const findByEmail = async (email) => {
  const result = User.findOne({ where: { email } });
  return result;
};

module.exports = {
  userRegister,
  findByEmail,
};
