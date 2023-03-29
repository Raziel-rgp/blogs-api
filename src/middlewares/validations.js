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

const postRegisterSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required().messages({
    'any.required': 'one or more "categoryIds" not found',
    'string.empty': 'one or more "categoryIds" not found',
  }),
});

const validatePostSchema = (req, res, next) => {
  const { error } = postRegisterSchema.validate(req.body);
  const result = error ? res.status(400).json({ message: error.details[0].message }) : next();
  return result;
};

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
  const post = await postService.findById(id);
  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
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
  validatePostSchema,
};