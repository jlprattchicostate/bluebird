module.exports = function notFound(req, res, next) {
  if (res.headersSent) {
    return next();
  }

  res.status(404).json({ error: 'Not Found', details: `${req.method} ${req.originalUrl}` });
};
