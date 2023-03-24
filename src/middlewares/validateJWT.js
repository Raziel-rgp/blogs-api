const jwt = require('jsonwebtoken');

const tokenKey = 'Sk2398MpOL92';

const secret = process.env.JWT_SECRET || tokenKey;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '5min',
};

const tokenGenerator = (payload) => {
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

const verifyToken = (token) => {
  const decode = jwt.verify(token, secret);
  return decode;
};

module.exports = {
  tokenGenerator,
  verifyToken,
};
