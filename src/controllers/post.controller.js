const { postService } = require('../services');
const { verifyToken } = require('../middlewares/validateJWT');

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

const updateById = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const att = await postService.updateById(id, { title, content });
  return res.status(200).json(att);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  await postService.deleteById(id);
  return res.status(204).end();
};

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { authorization } = req.headers;
  const { login } = verifyToken(authorization);
  const category = await postService.findCategoriesById(categoryIds);
  if (category.length !== 2) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }
  const message = await postService.createPost(login.id, { title, content, categoryIds });
  return res.status(201).json(message);
};

module.exports = {
  findAll,
  findById,
  updateById,
  deleteById,
  createPost,
};
