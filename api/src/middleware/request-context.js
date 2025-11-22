const { randomUUID } = require('crypto');

module.exports = function requestContext(req, res, next) {
  const traceId = randomUUID();
  req.id = traceId;
  res.locals.traceId = traceId;
  res.setHeader('X-Request-Id', traceId);
  next();
};
