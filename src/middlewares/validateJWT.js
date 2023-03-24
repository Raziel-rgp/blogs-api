const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const tokenKey = 'Sk2398MpOL92';

const secret = process.env.JWT_SECRET || tokenKey;

const jwtConfig = {
  algorithm: 'HS256',
};

const tokenGenerator = (payload) => {
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

const verifyToken = (token) => {
  const decode = jwt.verify(token, secret);
  return decode;
};

const tokenValidator = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decode = verifyToken(authorization);
    console.log(decode);
    const user = await userService.findByEmail(decode.login.email);
    console.log('user', user);
    if (decode.login.email === user.dataValues.email) { return next(); }
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  tokenGenerator,
  verifyToken,
  tokenValidator,
};
