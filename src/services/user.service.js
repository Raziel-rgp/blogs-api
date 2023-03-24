const { User } = require('../models');

const userRegister = async (displayName, email, password, image) => {
  const result = await User.create({ displayName, email, password, image });
  return result;
};

const findByEmail = async (email) => {
  const result = await User.findOne({ where: { email } });
  console.log(result);
  return result;
};

const findAll = async () => {
  const result = await User.findAll({ attributes: { exclude: 'password' } });
  return result;
};

module.exports = {
  userRegister,
  findByEmail,
  findAll,
};
