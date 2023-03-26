const { categoryService } = require('../services');

const categoryRegister = async (req, res) => {
  const { name } = req.body;
  console.log('name', name);
  const result = await categoryService.categoryRegister(name);
  console.log(result);
  return res.status(201).json(result);
};

const findAll = async (req, res) => {
  const message = await categoryService.findAll(req);
  return res.status(200).json(message);
};

module.exports = {
  categoryRegister,
  findAll,
};
