const createError = require('http-errors');

function handleSupabaseError(error, message = 'Database error') {
  if (error) {
    const err = createError(500, message);
    err.details = error.message;
    throw err;
  }
}

function ensureFound(record, entity = 'Resource') {
  if (!record) {
    throw createError(404, `${entity} not found`);
  }
  return record;
}

module.exports = {
  handleSupabaseError,
  ensureFound,
};
