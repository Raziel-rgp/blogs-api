const Joi = require('joi');

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

module.exports = {
  userRegisterSchema,
  categoryRegisterSchema,
  validateCategory,
};