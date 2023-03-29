const { userService } = require('../services');
const { userRegisterSchema } = require('../middlewares/validations');
const { tokenGenerator } = require('../middlewares/validateJWT');

// Marcel Guimaraes 025 b ajudou d+++++++++++++++++++++++++
const sms = { message: 'User does not exist' };

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

const findById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.findById(id);
  const result = !user ? res.status(404).json(sms) : res.status(200).json(user);
  return result;
};

const deleteUsuario = async (req, res) => {
  const token = req.headers.authorization;
  const decode = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  await userService.deleteUser(decode.login.id);
  return res.status(204).json();
};

module.exports = {
  userRegister,
  findAll,
  findById,
  deleteUsuario,
};
