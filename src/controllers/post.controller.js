const { postService } = require('../services');

const findAll = async (_req, res) => {
  console.log('passou pelo controller');
  const result = await postService.findAll();
  return res.status(200).json(result);
};

module.exports = {
  findAll,
};
