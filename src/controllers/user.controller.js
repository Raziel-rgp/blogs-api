const { userService } = require('../services');
const { userRegisterSchema } = require('../middlewares/validations');
const { tokenGenerator } = require('../middlewares/validateJWT');

// Marcel Guimaraes 025 b ajudou d+++++++++++++++++++++++++
const userRegister = async (req, res) => {
  try {
    const { email, displayName, password, image } = await userRegisterSchema
      .validateAsync(req.body);
    const user = await userService.findByEmail(email);
    if (user) {
      return res.status(409).json({ message: 'User already registered' });
    }
    const novoUsuario = await userService.userRegister(displayName, email, password, image);
    const token = tokenGenerator({ novoUsuario });
    return res.status(201).json({ token });
  } catch (err) {
    if (err.isJoy) {
      return res.status(400).json({ message: err.details[0].message });
    }
    return res.status(400).json({ message: err.message });
  }
};

const findAll = async (req, res) => {
  const message = await userService.findAll(req);
  return res.status(200).json(message);
};

module.exports = {
  userRegister,
  findAll,
};
