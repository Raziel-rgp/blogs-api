const Joi = require('joi');
const { postService } = require('../services');

const userRegisterSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

const categoryRegisterSchema = Joi.object({
  name: Joi.string().required(),
});

// com ajuda de Rubens Deola 23 tribo A
const validateCategory = (req, res, next) => {
  const { error } = categoryRegisterSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  return next();
};

const validatePost = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

// Creditos ao Josimar Saldanha 25-B
const userPermissions = async (req, res, next) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  const decode = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  console.log(decode);
  const post = await postService.findById(id);
  if (post.userId !== decode.login.id) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  return next();
  };

module.exports = {
  userRegisterSchema,
  categoryRegisterSchema,
  validateCategory,
  validatePost,
  userPermissions,
};