const { postService } = require('../services');

const findAll = async (_req, res) => {
  const result = await postService.findAll();
  return res.status(200).json(result);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const findId = await postService.findById(id);
  const result = !findId ? res.status(404).json({ message: 'Post does not exist' }) 
    : res.status(200).json(findId);
  return result;
};

module.exports = {
  findAll,
  findById,
};
