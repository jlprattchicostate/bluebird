const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function auth(req, _res, next) {
  if (config.authDisabled) {
    return next();
  }

  const header = req.get('Authorization') || '';
  const [, token] = header.split(' ');

  if (!token) {
    return next(createError(401, 'Missing bearer token'));
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    return next();
  } catch (error) {
    const authError = createError(401, 'Invalid token');
    authError.details = error.message;
    return next(authError);
  }
};
