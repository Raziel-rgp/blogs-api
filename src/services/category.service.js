const { Category } = require('../models');

const categoryRegister = async (name) => {
  const result = await Category.create({ name });
  return result;
};

module.exports = {
  categoryRegister,
};
