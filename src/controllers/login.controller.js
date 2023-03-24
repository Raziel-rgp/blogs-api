const { loginService } = require('../services/index');
const { tokenGenerator } = require('../middlewares/validateJWT');

const loginCreateUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  const login = await loginService.login(email, password);
  if (!login) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  const token = tokenGenerator({ login });
  return res.status(200).json({ token });
};

module.exports = {
  loginCreateUser,
};
