const logger = require('../logger');

module.exports = function errorHandler(err, req, res, _next) {
  const status = err.status || 500;
  const payload = {
    error: err.message || 'Internal Server Error',
  };

  if (err.details) {
    payload.details = err.details;
  }

  logger.error({ err, traceId: req.id }, 'Request failed');

  res.status(status).json(payload);
};
